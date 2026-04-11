import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Rocket, Sparkles, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import MediaUpload from '../components/ui/MediaUpload';
import { gigService } from '../features/gigs/gigService';
import { GigCategory, GigStatus } from '../types/gig';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const categories = Object.values(GigCategory);

const PostGig: FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: GigCategory.GRAPHIC_DESIGN,
    price: 50,
    delivery_time: '2-3 Days',
    revisions: 3 as number | 'Unlimited',
  });

  const isFormValid = formData.title.length > 5 && formData.description.length > 20 && uploadedMediaUrl;

  const handleSubmit = async (): Promise<void> => {
    if (!isFormValid) {
      toast.error('Please complete all fields and upload a safe showcase video.');
      return;
    }

    setIsSubmitting(true);
    try {
      await gigService.createGig({
        ...formData,
        user_id: user?.id!,
        seller_id: user?.id!,
        thumbnail_url: uploadedMediaUrl!,
        video_url: uploadedMediaUrl!,
        status: GigStatus.ACTIVE,
        rating: 5,
        review_count: 0,
        is_verified: true
      });
      toast.success('Your skill is now live on SkillTok!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to publish gig.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-5xl mx-auto min-h-screen overflow-y-auto no-scrollbar">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-10">
          <section>
            <h2 className="text-4xl font-extrabold tracking-tighter mb-2 text-on-surface">Publish Your Skill</h2>
            <p className="text-on-surface-variant font-medium">Join the elite network of vertical-first creators.</p>
          </section>

          {/* Secure AI Moderated Upload */}
          <div className="space-y-4">
             <label className="text-[10px] uppercase font-black text-primary tracking-[0.2em] px-1 flex items-center gap-2">
                <CheckCircle size={14} /> 
                Stage 1: Verified Media
             </label>
             {/* Using my previously created MediaUpload component */}
             <MediaUpload onUploadSuccess={(url) => setUploadedMediaUrl(url)} />
          </div>

          <div className="space-y-6">
             <Input 
                name="title"
                label="Gig Title" 
                placeholder="I will edit your high-retention reels..." 
                value={formData.title}
                onChange={handleInputChange}
                icon={<Sparkles size={18} className="text-primary" />}
             />
             
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest px-1">Detailed Service Scope</label>
                <textarea 
                  name="description"
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-2xl p-4 text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all resize-none min-h-[120px]"
                  placeholder="Tell us about your creative process and tools..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest px-1">Category</label>
                   <select 
                    name="category"
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-xl h-14 px-4 text-on-surface outline-none appearance-none"
                    value={formData.category}
                    onChange={handleInputChange}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
                <Input 
                  name="price"
                  label="Starting Price (₹)" 
                  type="number" 
                  value={formData.price}
                  onChange={handleInputChange}
                />
             </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 relative">
           <div className="sticky top-24 space-y-8">
              <div className="aspect-[9/16] max-w-[320px] mx-auto rounded-[2.5rem] bg-zinc-900 overflow-hidden shadow-2xl relative border border-white/10 group">
                {uploadedMediaUrl ? (
                   <img src={uploadedMediaUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Preview" />
                ) : (
                   <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/50">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Awaiting Media</span>
                   </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-0 left-0 p-6 w-full space-y-3">
                   <h4 className="text-white font-bold leading-tight line-clamp-2">{formData.title || 'Your Story Starts Here...'}</h4>
                   <div className="flex justify-between items-center">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black">{formData.category.toUpperCase()}</span>
                      <span className="text-xl font-black text-primary">₹{formData.price}</span>
                   </div>
                </div>
              </div>

              <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 space-y-6 shadow-xl">
                 <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Estimated Earnings (95%)</span>
                    <span className="text-2xl font-black text-primary">₹{(formData.price * 0.95).toFixed(2)}</span>
                 </div>
                 <Button 
                    isLoading={isSubmitting} 
                    disabled={!isFormValid}
                    onClick={handleSubmit} 
                    className="w-full py-8 text-lg gap-3"
                 >
                    Launch Gig <Rocket size={20} />
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PostGig;
