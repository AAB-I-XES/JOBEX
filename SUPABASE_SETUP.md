# SkillTok Supabase Backend Setup

Run the following SQL script in your Supabase **SQL Editor** to initialize the database schema, security policies, and automatic triggers for the SkillTok platform.

---

### 1. Database Schema

```sql
-- ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
-- Stores user-specific information linked to Auth
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  username TEXT UNIQUE,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  level INTEGER DEFAULT 1,
  balance NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. GIGS TABLE
-- Stores the skills/services listed by creators
CREATE TABLE IF NOT EXISTS public.gigs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  delivery_time TEXT NOT NULL,
  revisions TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT,
  rating NUMERIC DEFAULT 5,
  review_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'active',
  is_trending BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ORDERS TABLE
-- Tracks purchases between buyers and sellers
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES auth.users ON DELETE SET NULL,
  seller_id UUID REFERENCES auth.users ON DELETE SET NULL,
  gig_id UUID REFERENCES public.gigs ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, in_progress, delivered, completed, cancelled
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CONVERSATIONS TABLE
-- Groups messages between two users
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user1_id UUID REFERENCES auth.users ON DELETE CASCADE,
  user2_id UUID REFERENCES auth.users ON DELETE CASCADE,
  last_message TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- 5. MESSAGES TABLE
-- Individual chat messages
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users ON DELETE SET NULL,
  receiver_id UUID REFERENCES auth.users ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 2. Row Level Security (RLS)

Enable RLS and define policies to protect user data.

```sql
-- ENABLE RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- GIGS POLICIES
CREATE POLICY "Gigs are viewable by everyone" ON public.gigs FOR SELECT USING (true);
CREATE POLICY "Sellers can manage own gigs" ON public.gigs FOR ALL USING (auth.uid() = user_id);

-- ORDERS POLICIES
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- CHAT POLICIES
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
```

---

### 3. Automated Profile Creation

Run this to ensure a profile is created every time a new user signs up via OAuth or Magic Link.

```sql
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE(new.raw_user_meta_data->>'avatar_url', 'https://picsum.photos/seed/' || new.id || '/200/200')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute function on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

### 4. Storage Buckets

**IMPORTANT**: You must create these buckets manually in the Supabase Dashboard under **Storage**:

1.  **`gigs`**: Set to **Public**. (Used for gig thumbnails and videos).
2.  **`media`**: Set to **Public**. (Used for the moderated upload pipeline).
3.  **`profiles`**: Set to **Public**. (Used for user avatars).

**Storage Policies** (SQL Console):
```sql
-- Allow public access to all buckets
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('gigs', 'media', 'profiles'));
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```
