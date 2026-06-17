import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scissors, Heart, Sparkles, Leaf, Star, Feather, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { SiInstagram, SiWhatsapp, SiFacebook } from "react-icons/si";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

// Images
import heroImg from "@/assets/images/hero.png";
import aboutImg from "@/assets/images/about.png";
import gallery1 from "@/assets/images/gallery-1.png";
import gallery2 from "@/assets/images/gallery-2.png";
import gallery3 from "@/assets/images/gallery-3.png";
import gallery4 from "@/assets/images/gallery-4.png";
import gallery5 from "@/assets/images/gallery-5.png";
import gallery6 from "@/assets/images/gallery-6.png";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  message: z.string().min(10, "Message is too short"),
});

export default function Home() {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly to confirm your appointment.",
    });
    form.reset();
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* 1. Sticky Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <span className="font-serif text-3xl font-bold text-primary">ArtiS</span>
            <span className="font-sans text-sm tracking-widest text-foreground font-medium uppercase hidden sm:inline-block">Beauty Lounge</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['About', 'Services', 'Why Us', 'Reviews', 'Gallery', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                className="hover:text-primary transition-colors data-testid={`nav-${item}`}"
              >
                {item}
              </button>
            ))}
          </nav>
          
          <Button 
            className="rounded-full px-6 font-semibold tracking-wide" 
            onClick={() => scrollTo('contact')}
            data-testid="btn-book-nav"
          >
            Book Now
          </Button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: y1, height: "120%" }} className="absolute inset-0 -top-[10%]">
            <img src={heroImg} alt="Luxury Salon" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </motion.div>
        </div>
        
        <div className="container relative z-10 px-4 pt-20 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8"
          >
            <div className="flex gap-1 text-[#D4AF6A]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-sm font-medium tracking-wide">4.8/5 Customer Reviews</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white max-w-4xl leading-[1.1] mb-6"
          >
            ArtiS Beauty Lounge <span className="italic font-light">&</span> Makeover
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 font-light"
          >
            Enhancing Your Natural Beauty with Style & Care. Experience premium luxury in an elegant sanctuary.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center"
          >
            <Button size="lg" className="rounded-full text-base px-8 py-6" onClick={() => scrollTo('contact')} data-testid="btn-hero-book">
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 py-6 bg-transparent text-white border-white/30 hover:bg-white/10" asChild data-testid="btn-hero-call">
              <a href="tel:+919977505333">Call Now</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section id="about" className="py-24 md:py-32 bg-secondary/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-t-full overflow-hidden border-8 border-white shadow-xl relative z-10">
                <img src={aboutImg} alt="Salon Consultation" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0" />
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">A Sanctuary of Beauty & Elegance</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                ArtiS Beauty Lounge & Makeover is dedicated to providing premium beauty and grooming services in a relaxing and welcoming environment. Our experienced professionals focus on personalized care to help every client look and feel their best.
              </p>
              <ul className="space-y-4 mb-10">
                {['Premium, branded products only', 'Highly trained expert stylists', 'Impeccable hygiene standards'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <ChevronRight size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => scrollTo('services')} variant="outline" className="rounded-full px-8" data-testid="btn-discover-services">
                Discover Services
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="py-24 md:py-32">
        <div className="container px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Indulge in Excellence</h3>
            <p className="text-muted-foreground text-lg">Curated treatments designed to elevate your natural radiance.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { icon: Scissors, title: "Hair Styling & Spa", desc: "Expert cuts, coloring, and deeply nourishing spa treatments." },
              { icon: Heart, title: "Bridal Makeup", desc: "Flawless, long-lasting makeup for your special day." },
              { icon: Sparkles, title: "Party Makeup", desc: "Glamorous looks tailored to your features and outfit." },
              { icon: Leaf, title: "Facials & Skincare", desc: "Rejuvenating treatments for glowing, healthy skin." },
              { icon: Star, title: "Manicure & Pedicure", desc: "Luxury hand and foot care with premium polishes." },
              { icon: Feather, title: "Waxing & Threading", desc: "Gentle, precise hair removal for smooth results." }
            ].map((service, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-2 cursor-pointer h-full">
                  <CardContent className="p-8 text-center flex flex-col items-center h-full justify-center">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-xl font-serif font-bold mb-3">{service.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section id="why-us" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
        
        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-1"
            >
              <h2 className="text-sm font-bold tracking-widest uppercase text-primary-foreground/70 mb-4">Why Choose Us</h2>
              <h3 className="text-4xl md:text-5xl font-serif mb-6">The ArtiS Difference</h3>
              <p className="text-primary-foreground/80 text-lg mb-8">We believe beauty is an art form. Every detail of our salon is designed to provide you with an unmatched, luxurious experience.</p>
              <Button variant="secondary" className="rounded-full px-8 text-primary hover:bg-white" onClick={() => scrollTo('contact')} data-testid="btn-whyus-book">
                Experience It Today
              </Button>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-10"
            >
              {[
                { title: "Experienced Beauty Experts", icon: Star },
                { title: "Premium Products", icon: Sparkles },
                { title: "Hygienic Environment", icon: Leaf },
                { title: "Personalized Consultation", icon: Heart },
                { title: "Affordable Pricing", icon: Scissors },
                { title: "Excellent Customer Satisfaction", icon: Feather }
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-accent">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2">{feature.title}</h4>
                    <p className="text-primary-foreground/70 text-sm">Delivering excellence and quality in every single aspect of your visit.</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Reviews Section */}
      <section id="reviews" className="py-24 md:py-32 bg-secondary/30">
        <div className="container px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">What Our Clients Say</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Loved by Many</h3>
            <div className="inline-flex items-center justify-center gap-2 mb-4 bg-white px-6 py-2 rounded-full shadow-sm">
              <div className="flex text-[#D4AF6A]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="font-bold text-foreground">4.8/5</span>
              <span className="text-muted-foreground text-sm">Based on Customer Reviews</span>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { name: "Priya S.", text: "Amazing experience! The bridal makeup was absolutely stunning. Highly recommend ArtiS for any special occasion." },
              { name: "Meera R.", text: "Best facial I have ever had. The staff is so professional and caring. Will definitely come back!" },
              { name: "Anjali K.", text: "Love the hair spa services here. My hair feels so healthy and shiny. The ambiance is so relaxing!" }
            ].map((review, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="bg-white border-none shadow-md h-full flex flex-col justify-between">
                  <CardContent className="p-8">
                    <div className="flex text-[#D4AF6A] mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-muted-foreground italic mb-6 leading-relaxed">"{review.text}"</p>
                    <div className="mt-auto">
                      <p className="font-serif font-bold text-lg text-foreground">— {review.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Gallery Section */}
      <section id="gallery" className="py-24 md:py-32">
        <div className="container px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">Our Work</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground">A Glimpse of Perfection</h3>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4"
          >
            {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((img, i) => (
              <motion.div key={i} variants={fadeInUp} className="group relative aspect-square overflow-hidden rounded-xl">
                <img src={img} alt={`Gallery Image ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <Sparkles size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-secondary/50">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">Get In Touch</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8">Book Your Visit</h3>
              
              <div className="space-y-8 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">ArtiS Beauty Lounge & Makeover</h4>
                    <p className="text-muted-foreground">Premium Salon Services<br/>India</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone Number</h4>
                    <p className="text-muted-foreground">+91 99775 05333</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <Feather size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Opening Hours</h4>
                    <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 8:00 PM<br/>Sun: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="rounded-full gap-2 px-6" asChild data-testid="link-call-contact">
                  <a href="tel:+919977505333">
                    <Phone size={16} /> Call Now
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full gap-2 px-6 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10" asChild data-testid="link-whatsapp-contact">
                  <a href="https://wa.me/919977505333" target="_blank" rel="noopener noreferrer">
                    <SiWhatsapp size={16} /> WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Card className="border-none shadow-xl">
                <CardContent className="p-8 md:p-10">
                  <h4 className="text-2xl font-serif font-bold mb-6">Send a Message</h4>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} className="bg-secondary/50 border-none focus-visible:ring-primary" data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} className="bg-secondary/50 border-none focus-visible:ring-primary" data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message or Service Required</FormLabel>
                            <FormControl>
                              <Textarea placeholder="How can we help you?" className="min-h-[120px] bg-secondary/50 border-none focus-visible:ring-primary resize-none" {...field} data-testid="input-message" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full rounded-full py-6 text-base" data-testid="btn-submit-contact">
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#1C1C1E] text-white py-16">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold text-primary mb-2">ArtiS</h2>
            <p className="text-white/60 tracking-widest text-sm uppercase">Beauty Lounge & Makeover</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors data-testid='social-instagram'">
              <SiInstagram size={18} />
            </a>
            <a href="https://wa.me/919977505333" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors data-testid='social-whatsapp'">
              <SiWhatsapp size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors data-testid='social-facebook'">
              <SiFacebook size={18} />
            </a>
          </div>
        </div>
        <div className="container px-4 mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>Copyright &copy; 2026 ArtiS Beauty Lounge & Makeover. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
