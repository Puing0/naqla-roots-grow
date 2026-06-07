/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Sprout, Star, MessageSquareWarning, TrendingUp, ShieldCheck, Droplets, Quote, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { initialReviews, initialComplaints, stats, type Review, type Complaint } from "@/lib/naqla-data";
import { NaqlaLogo } from "@/components/NaqlaLogo";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import naqlaFront from "@/assets/naqla-front.png";
import naqlaBack from "@/assets/naqla-back.png";
import seedlingRoots from "@/assets/seedling-roots.jpg";
import fieldAerial from "@/assets/field-aerial.jpg";
import handsSoil from "@/assets/hands-soil.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naقla — Avis & Réclamations" },
      { name: "description", content: "Partagez votre expérience avec Naقla, la solution bactérienne anti-stress pour transplantation." },
      { property: "og:title", content: "Naقla — Avis & Réclamations" },
      { property: "og:description", content: "Plateforme d'avis et de réclamations pour les utilisateurs de Naقla." },
    ],
  }),
  component: Index,
});

function StarRating({ value, onChange, size = 18 }: { value: number; onChange?: (n: number) => void; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          disabled={!onChange}
          className={onChange ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
          aria-label={`${n} étoiles`}
        >
          <Star
            size={size}
            className={n <= value ? "fill-accent text-accent" : "fill-none text-muted-foreground/40"}
          />
        </button>
      ))}
    </div>
  );
}

function Index() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  // Review form
  const [rName, setRName] = useState("");
  const [rCrop, setRCrop] = useState("");
  const [rRating, setRRating] = useState(5);
  const [rComment, setRComment] = useState("");

  // Complaint form
  const [cName, setCName] = useState("");
  const [cCategory, setCCategory] = useState<Complaint["category"]>("Packaging");
  const [cSubject, setCSubject] = useState("");
  const [cMessage, setCMessage] = useState("");

  const avgRating = useMemo(
    () => (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
    [reviews],
  );

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rName.trim() || !rComment.trim()) {
      toast.error("Merci de remplir votre nom et votre commentaire.");
      return;
    }
    const newReview: Review = {
      id: `r${Date.now()}`,
      name: rName,
      role: "Agriculteur",
      location: "—",
      rating: rRating,
      cropType: rCrop || "Non précisé",
      date: new Date().toISOString().slice(0, 10),
      comment: rComment,
      survivalImprovement: 25,
    };
    setReviews([newReview, ...reviews]);
    setRName(""); setRCrop(""); setRRating(5); setRComment("");
    toast.success("Merci ! Votre avis a été publié.");
  };

  const submitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName.trim() || !cSubject.trim() || !cMessage.trim()) {
      toast.error("Merci de remplir tous les champs.");
      return;
    }
    const newComplaint: Complaint = {
      id: `c${Date.now()}`,
      name: cName,
      location: "—",
      date: new Date().toISOString().slice(0, 10),
      category: cCategory,
      status: "Open",
      subject: cSubject,
      message: cMessage,
    };
    setComplaints([newComplaint, ...complaints]);
    setCName(""); setCSubject(""); setCMessage(""); setCCategory("Packaging");
    toast.success("Réclamation enregistrée. Notre équipe vous répondra sous 48h.");
  };

  const statusColor = (s: Complaint["status"]) =>
    s === "Resolved" ? "bg-primary/15 text-primary border-primary/30"
      : s === "In Review" ? "bg-accent/15 text-accent border-accent/30"
        : "bg-destructive/15 text-destructive border-destructive/30";

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-right" />

      {/* Hero */}
      {/* Top nav */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 backdrop-blur-md bg-primary/85 border-b border-primary-foreground/10"
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <NaqlaLogo size="sm" />
          <a
            href="#feedback"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
          >
            Donner mon avis
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <header className="relative overflow-hidden min-h-[640px] flex items-center" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0">
          <img src={fieldAerial} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.28 0.08 150 / 0.85) 0%, oklch(0.22 0.06 155 / 0.7) 100%)" }} />
        </div>
        {/* Floating leaves */}
        <Leaf size={80} className="absolute top-10 left-[8%] text-primary-foreground/10 animate-leaf-float" />
        <Leaf size={56} className="absolute top-40 right-[12%] text-accent/20 animate-leaf-float" style={{ animationDelay: "1.5s" }} />
        <Sprout size={48} className="absolute bottom-20 left-[20%] text-primary-foreground/10 animate-leaf-float" style={{ animationDelay: "3s" }} />

        <div className="container mx-auto px-6 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6"
              >
                <Leaf size={14} className="text-accent" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase">From Stress to Success</span>
              </motion.div>

              <div className="mb-6"><NaqlaLogo size="lg" /></div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-3xl md:text-5xl font-serif font-light leading-tight mb-5 max-w-2xl"
              >
                La voix des cultivateurs,<br/>
                <span className="italic font-normal text-accent">racine de notre progrès.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-base md:text-lg text-primary-foreground/75 max-w-2xl mb-10 leading-relaxed"
              >
                Partagez vos résultats sur le terrain et signalez-nous tout problème.
                Chaque retour fait grandir nos racines.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
              >
                <StatCard icon={<Star size={18} />} label="Note moyenne" value={<AnimatedCounter value={Number(avgRating)} suffix="/5" />} />
                <StatCard icon={<MessageSquareWarning size={18} />} label="Avis collectés" value={<AnimatedCounter value={stats.totalReviews} suffix="+" />} />
                <StatCard icon={<ShieldCheck size={18} />} label="Résolution" value={<AnimatedCounter value={stats.resolvedComplaints} suffix="%" />} />
                <StatCard icon={<TrendingUp size={18} />} label="Gain de survie" value={<AnimatedCounter value={stats.avgSurvivalGain} prefix="+" suffix="%" />} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ delay: 0.4, duration: 0.9, type: "spring" }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              className="hidden md:block relative"
            >
              <div className="absolute -inset-8 bg-accent/30 blur-3xl rounded-full" />
              <img src={naqlaFront} alt="Sachet Naقla 500mL" className="relative w-72 drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Image gallery / story strip */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">Le produit</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Une solution <span className="italic">vivante</span> pour vos plants
          </h2>
          <p className="text-muted-foreground">
            Un consortium bactérien multi-souches qui renforce la tolérance des plantes aux stress
            de transplantation et aux conditions arides.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {[
            { src: seedlingRoots, title: "Enracinement vigoureux", desc: "Stimulation du développement racinaire" },
            { src: handsSoil, title: "Reprise rapide", desc: "Réduction du choc de transplantation" },
            { src: fieldAerial, title: "Rendement durable", desc: "Survie en conditions arides" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <img src={item.src} alt={item.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <p className="text-xs tracking-widest uppercase text-accent mb-2">0{i + 1}</p>
                <h3 className="font-serif text-2xl mb-1">{item.title}</h3>
                <p className="text-sm text-primary-foreground/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main */}
      <main id="feedback" className="container mx-auto px-6 py-12 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">Votre expérience</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Avis & réclamations
          </h2>
        </motion.div>

        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10 h-12 bg-secondary">
            <TabsTrigger value="reviews" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sprout size={16} /> Avis
            </TabsTrigger>
            <TabsTrigger value="complaints" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquareWarning size={16} /> Réclamations
            </TabsTrigger>
          </TabsList>

          {/* Reviews */}
          <TabsContent value="reviews" className="space-y-8">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
              <Card className="border-border/60 h-fit lg:sticky lg:top-24 overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="h-32 relative overflow-hidden">
                  <img src={handsSoil} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, var(--card) 100%)" }} />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Droplets className="text-accent" size={20} /> Laissez un avis
                  </CardTitle>
                  <CardDescription>Aidez d'autres agriculteurs à se décider.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={submitReview} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rname">Votre nom</Label>
                      <Input id="rname" value={rName} onChange={(e) => setRName(e.target.value)} placeholder="ex. Amine Belkacem" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rcrop">Type de culture</Label>
                      <Input id="rcrop" value={rCrop} onChange={(e) => setRCrop(e.target.value)} placeholder="ex. Oliviers, Tomates..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Note</Label>
                      <StarRating value={rRating} onChange={setRRating} size={24} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rcom">Commentaire</Label>
                      <Textarea id="rcom" value={rComment} onChange={(e) => setRComment(e.target.value)} rows={4} placeholder="Décrivez vos résultats..." />
                    </div>
                    <Button type="submit" className="w-full" style={{ boxShadow: "var(--shadow-glow)" }}>
                      Publier mon avis
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {reviews.map((r, i) => (
                    <motion.div
                      key={r.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i < 3 ? i * 0.08 : 0 }}
                    >
                      <Card className="border-border/60 transition-all hover:border-primary/40 hover:-translate-y-1 group" style={{ boxShadow: "var(--shadow-soft)" }}>
                        <CardContent className="p-6 relative">
                          <Quote className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors" size={40} />
                          <div className="flex items-start justify-between gap-4 mb-3 flex-wrap relative">
                            <div className="flex items-center gap-3">
                              <motion.div
                                whileHover={{ rotate: 8, scale: 1.1 }}
                                className="w-11 h-11 rounded-full flex items-center justify-center text-primary-foreground font-serif text-lg shrink-0"
                                style={{ background: "var(--gradient-leaf)" }}
                              >
                                {r.name.charAt(0)}
                              </motion.div>
                              <div>
                                <p className="font-semibold text-foreground">{r.name}</p>
                                <p className="text-xs text-muted-foreground">{r.role} · {r.location}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <StarRating value={r.rating} />
                              <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
                            </div>
                          </div>
                          <p className="text-foreground/90 leading-relaxed mb-4 relative">{r.comment}</p>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary" className="gap-1"><Sprout size={12} /> {r.cropType}</Badge>
                            <Badge className="bg-accent/15 text-accent border-accent/30 hover:bg-accent/20 gap-1">
                              <TrendingUp size={12} /> +{r.survivalImprovement}% survie
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>

          {/* Complaints */}
          <TabsContent value="complaints" className="space-y-8">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
              <Card className="border-border/60 h-fit lg:sticky lg:top-24 overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
                <div className="h-32 relative overflow-hidden">
                  <img src={naqlaBack} alt="" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, var(--card) 100%)" }} />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <MessageSquareWarning className="text-accent" size={20} /> Signaler un problème
                  </CardTitle>
                  <CardDescription>Notre équipe répond sous 48h.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={submitComplaint} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cname">Votre nom</Label>
                      <Input id="cname" value={cName} onChange={(e) => setCName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Select value={cCategory} onValueChange={(v) => setCCategory(v as Complaint["category"])}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Packaging">Packaging</SelectItem>
                          <SelectItem value="Delivery">Livraison</SelectItem>
                          <SelectItem value="Efficacy">Efficacité</SelectItem>
                          <SelectItem value="Application">Application</SelectItem>
                          <SelectItem value="Other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="csub">Sujet</Label>
                      <Input id="csub" value={cSubject} onChange={(e) => setCSubject(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cmsg">Message</Label>
                      <Textarea id="cmsg" value={cMessage} onChange={(e) => setCMessage(e.target.value)} rows={4} />
                    </div>
                    <Button type="submit" className="w-full" style={{ boxShadow: "var(--shadow-glow)" }}>
                      Envoyer la réclamation
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {complaints.map((c, i) => (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: i < 3 ? i * 0.08 : 0 }}
                    >
                      <Card className="border-border/60 transition-all hover:border-accent/50 hover:-translate-y-1 border-l-4 border-l-accent/40" style={{ boxShadow: "var(--shadow-soft)" }}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                            <div>
                              <p className="font-semibold text-foreground">{c.subject}</p>
                              <p className="text-xs text-muted-foreground">{c.name} · {c.location} · {c.date}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="border-border">{c.category}</Badge>
                              <Badge className={statusColor(c.status)} variant="outline">{c.status}</Badge>
                            </div>
                          </div>
                          <p className="text-foreground/85 leading-relaxed">{c.message}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="relative mt-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <img src={fieldAerial} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="container mx-auto px-6 py-14 relative text-center text-primary-foreground">
          <div className="flex justify-center mb-6"><NaqlaLogo size="md" /></div>
          <p className="font-serif italic text-2xl text-accent mb-3">« From Stress to Success »</p>
          <p className="text-primary-foreground/70 text-sm">
            Consortium bactérien anti-stress · Conçu et développé en Algérie 🇩🇿
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 p-4 hover:bg-primary-foreground/15 transition-colors"
    >
      <div className="flex items-center gap-2 text-primary-foreground/70 mb-1">{icon}<span className="text-xs">{label}</span></div>
      <p className="text-2xl font-bold font-serif text-primary-foreground">{value}</p>
    </motion.div>
  );
}
