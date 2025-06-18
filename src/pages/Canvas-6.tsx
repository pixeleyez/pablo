// PabloDemoLoop.tsx — Production-quality MVP with active content
import { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, MapPin, Wifi, Coffee,
  Dumbbell, Car, Baby, Gamepad2, Menu, X, MessageSquare,
  Inbox, Image as ImageIcon, User, Edit, Star, Heart,
  Bookmark, TrendingUp, Calendar, ChevronRight, CreditCard,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquareHeart, Users, Camera, Sparkles } from "lucide-react";


const DemoControls = ({
  isPlaying,
  onPlayPause,
  progress,
  onProgressChange,
  speed,
  onSpeedChange,
  soundEnabled,
  onSoundToggle,
  totalSteps
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  progress: number;
  onProgressChange: (value: number) => void;
  speed: number;
  onSpeedChange: (value: string) => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  totalSteps: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-4 z-50 border border-gray-200"
  >
    <Button
      size="sm"
      variant="ghost"
      onClick={onPlayPause}
      className="hover:bg-blue-50"
    >
      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
    </Button>

    <div className="flex items-center gap-3 w-64">
      <span className="text-xs text-gray-500 w-8">{progress + 1}</span>
      <Slider
        value={[progress]}
        max={totalSteps - 1}
        onValueChange={([v]) => onProgressChange(v)}
        className="flex-1"
      />
      <span className="text-xs text-gray-500 w-8">{totalSteps}</span>
    </div>

    <Select value={speed.toString()} onValueChange={onSpeedChange}>
      <SelectTrigger className="w-16 h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0.5">0.5×</SelectItem>
        <SelectItem value="1">1×</SelectItem>
        <SelectItem value="1.5">1.5×</SelectItem>
        <SelectItem value="2">2×</SelectItem>
      </SelectContent>
    </Select>

    <Button
      size="sm"
      variant="ghost"
      onClick={onSoundToggle}
      className="hover:bg-blue-50"
    >
      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </Button>
  </motion.div>
);

/**************** TYPES ****************/
interface Msg { from: "pablo" | "user"; text: string }
interface Amenity { id: string; icon: React.ReactNode; name: string }
interface Property {
  id: string;
  title: string;
  price: string;
  desc: string;
  images: string[];
  amenities: Amenity[];
  location: string;
  rating: number;
  reviews: number;
}
interface Influencer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  specialty: string;
  tip: string;
}
interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
  trending?: boolean;
}
interface DemoState {
  current: "p1" | "p2" | null;
  compare: boolean;
  iti: boolean;
  extras: boolean;
  location: string;
}

/**************** STATIC DATA ****************/
const PROPS: Record<string, Property> = {
  p1: {
    id: "p1",
    title: "4‑BDR UWS Apt – Gaming Corner",
    price: "$789/night",
    desc: "Park‑view master, same gaming setup kids loved in Palm Beach.",
    images: [
      "/images/apt1-living.jpg",
      "/images/apt1-gaming.jpg",
      "/images/apt1-master.jpg"
    ],
    amenities: [
      { id: "wifi", icon: <Wifi className="w-4 h-4" />, name: "High-Speed WiFi" },
      { id: "gaming", icon: <Gamepad2 className="w-4 h-4" />, name: "Gaming Setup" },
      { id: "parking", icon: <Car className="w-4 h-4" />, name: "Parking" },
    ],
    location: "Upper West Side, New York",
    rating: 4.9,
    reviews: 127
  },
  p2: {
    id: "p2",
    title: "Broadway Gem – Juice Press Downstairs",
    price: "$870/night",
    desc: "Bunk room + crib, cold‑press juicer, cafés & bakeries next door.",
    images: [
      "/images/apt2-living.jpg",
      "/images/apt2-kitchen.jpg",
      "/images/apt2-bunk.jpg"
    ],
    amenities: [
      { id: "wifi", icon: <Wifi className="w-4 h-4" />, name: "High-Speed WiFi" },
      { id: "coffee", icon: <Coffee className="w-4 h-4" />, name: "Juice Bar" },
      { id: "gym", icon: <Dumbbell className="w-4 h-4" />, name: "Fitness Center" },
      { id: "baby", icon: <Baby className="w-4 h-4" />, name: "Baby-Friendly" },
    ],
    location: "Broadway & 72nd, New York",
    rating: 4.8,
    reviews: 89
  },
};

const INFLUENCERS: Influencer[] = [
  {
    id: "1",
    name: "Sarah Chen",
    handle: "@familytravels",
    avatar: "/images/influencer-sarah.jpg",
    specialty: "Family Travel Expert",
    tip: "The Upper West Side is perfect for families. Don't miss the Natural History Museum!"
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    handle: "@nycfoodie",
    avatar: "/images/influencer-mike.jpg",
    specialty: "NYC Food Guide",
    tip: "Juice Press has the best green juice in the city. Perfect for morning routines!"
  },
  {
    id: "3",
    name: "Emma Williams",
    handle: "@budgetexplorer",
    avatar: "/images/influencer-emma.jpg",
    specialty: "Budget Travel Pro",
    tip: "Book UWS apartments on weekdays for better rates. Save 20-30%!"
  }
];

const ARTICLES: Article[] = [
  {
    id: "1",
    title: "Hidden Gems of the Upper West Side",
    excerpt: "Discover the neighborhood's best-kept secrets, from cozy cafes to peaceful parks perfect for families.",
    author: "Pablo Editorial Team",
    readTime: "5 min read",
    image: "/images/article-uws.jpg",
    trending: true
  },
  {
    id: "2",
    title: "NYC with Kids: Your Complete Guide",
    excerpt: "Everything you need to know about exploring New York City with children of all ages.",
    author: "Family Travel Expert",
    readTime: "8 min read",
    image: "/images/article-kids.jpg"
  },
  {
    id: "3",
    title: "Best Bakeries Near Broadway",
    excerpt: "Start your morning right with fresh pastries from these local favorites.",
    author: "Local Foodie",
    readTime: "3 min read",
    image: "/images/article-bakeries.jpg"
  }
];

/**************** ENHANCED UI COMPONENTS ****************/
const DashboardMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light">Dashboard</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[#7e6441]" />
              </div>
              <div>
                <p className="font-medium">Slavik K.</p>
                <p className="text-sm text-gray-600">Super Dad • 5 kids</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-2">
            <MenuItem icon={<MessageSquare />} label="Chat with Pablo" badge="AI" />
            <MenuItem icon={<MapPin />} label="Search Stays" />
            <MenuItem icon={<Inbox />} label="Messages" badge="3" />
            <MenuItem icon={<Calendar />} label="My Trips" />
            <MenuItem icon={<ImageIcon />} label="Travel Canvas" />
            <MenuItem icon={<Star />} label="Saved Places" />
            <MenuItem icon={<Edit />} label="Become an Editor" />
            <MenuItem icon={<User />} label="Profile & Preferences" />
          </div>

          <div className="p-6 border-t">
            <p className="text-xs text-gray-500 mb-4">Quick Stats</p>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Places Visited" value="47" />
              <StatCard label="Reviews" value="4.9★" />
              <StatCard label="Saved" value="$3,240" />
              <StatCard label="Member Since" value="2023" />
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const MenuItem = ({ icon, label, badge }: { icon: React.ReactNode; label: string; badge?: string }) => (
  <motion.button
    whileHover={{ x: 4 }}
    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
  >
    <div className="flex items-center gap-3">
      <span className="text-gray-600">{icon}</span>
      <span className="font-medium text-gray-800">{label}</span>
    </div>
    {badge && (
      <Badge variant="secondary" className=" bg-[#f5f1ed] text-[#7e6441]">
        {badge}
      </Badge>
    )}
  </motion.button>
);

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <p className="text-xs text-gray-600">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

const PropertyCard = ({ p, isLoading }: { p: Property; isLoading?: boolean }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (isLoading) {
    return (
      <Card className="rounded-2xl overflow-hidden animate-pulse">
        <div className="h-56 bg-gray-200" />
        <CardContent className="p-5 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group">
        <CardContent className="p-0">
          <div className="relative h-56 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={p.images[currentImage]}
                alt={p.title}
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            {/* Image navigation */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {p.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`transition-all ${i === currentImage
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/60 hover:bg-white/80"
                    } rounded-full`}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 bg-white/90 backdrop-blur rounded-full shadow-lg"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/90 backdrop-blur rounded-full shadow-lg"
              >
                <Bookmark className="w-4 h-4 text-gray-700" />
              </motion.button>
            </div>

            {/* Location badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/90 backdrop-blur text-gray-800 shadow-lg">
                <MapPin className="w-3 h-3 mr-1" />
                {p.location}
              </Badge>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#7e6441] transition-colors">
                  {p.title}
                </h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{p.rating}</span>
                  <span className="text-gray-500">({p.reviews})</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2">
              {p.amenities.map((amenity) => (
                <Badge key={amenity.id} variant="outline" className="text-xs border-gray-200">
                  {amenity.icon}
                  <span className="ml-1">{amenity.name}</span>
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-xl font-semibold text-gray-800">{p.price}</p>
              <Button variant="ghost" className="text-[#7e6441] hover:text-[#f5f1ed] hover:bg-[#7e6441]">
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InfluencerCard = ({ influencer }: { influencer: Influencer }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -2 }}
    className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all"
  >
    <div className="flex items-start gap-4">
      <img
        src={influencer.avatar}
        alt={influencer.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-[#7e6441]">{influencer.name}</h4>
          <Badge variant="secondary" className="text-xs bg-[#f5f1ed] text-[#7e6441]">
            <TrendingUp className="w-3 h-3 mr-1" />
            Insider
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{influencer.handle} • {influencer.specialty}</p>
        <p className="text-sm text-gray-700 mt-2 italic">"{influencer.tip}"</p>
      </div>
    </div>
  </motion.div>
);

const ArticleCard = ({ article }: { article: Article }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-white rounded-2xl overflow-hidden"
  >
    <div className="aspect-[3/2] relative">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover"
      />
      {article.trending && (
        <Badge className="absolute top-3 left-3  bg-[#7e6441] text-white border-0">
          <TrendingUp className="w-3 h-3 mr-1" />
          Trending
        </Badge>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-900">{article.title}</h3>
      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
        <span>{article.author}</span>
        <span>{article.readTime}</span>
      </div>
    </div>
  </motion.div>
);

// Add UserAvatar component
const UserAvatar = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-full overflow-hidden flex-shrink-0 ${className} bg-[#8B8378] text-white`}>
    <div className="w-full h-full flex items-center justify-center text-sm font-medium">
      T
    </div>
  </div>
);

const TypeBubble = ({
  msg,
  onDone,
  shouldType,
  speed = 1
}: {
  msg: Msg;
  onDone: () => void;
  shouldType: boolean;
  speed?: number;
}) => {
  const [txt, setTxt] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldType) {
      setTxt(msg.text);
      onDone();
      return;
    }

    let currentIndex = 0;
    const baseDelay = msg.from === "pablo" ? 35 : 25;
    const adjustedDelay = baseDelay / speed;

    const iv = setInterval(() => {
      currentIndex++;
      const next = msg.text.slice(0, currentIndex);
      setTxt(next);

      if (currentIndex >= msg.text.length) {
        clearInterval(iv);
        setTimeout(() => {
          onDone();
        }, 300);
      }
    }, adjustedDelay);

    return () => clearInterval(iv);
  }, [msg.text, onDone, shouldType, speed, msg.from]);

  const handleClick = () => {
    setIsHighlighted(true);
    bubbleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsHighlighted(false), 1500);
  };

  return (
    <motion.div
      ref={bubbleRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 flex items-end gap-3 ${msg.from === "pablo" ? "" : "flex-row-reverse"}`}
      onClick={handleClick}
    >
      {msg.from === "pablo" ? (        <div className="size-12 rounded-full overflow-hidden flex-shrink-0 bg-[#F5F1ED]">          <img             src="/images/pablo-logo.svg"             alt="Pablo"             className="w-full h-full object-contain p-2"            onError={(e) => {              e.currentTarget.style.display = 'none';              e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[#7e6441] text-lg font-semibold">P</div>';            }}          />        </div>      ) : (        <UserAvatar className="w-8 h-8" />      )}
      <div
        className={`relative max-w-[80%] rounded-[15px] px-4 py-3 text-[15px] cursor-pointer transition-all duration-300 ${
          msg.from === "pablo"
            ? "bg-[#f5f1ed] text-[#2D2D2D] rounded-bl-none shadow-sm"
            : "bg-[#4B4B4B] text-white rounded-br-none"
        } ${
          isHighlighted 
            ? msg.from === "pablo" 
              ? "ring-2 ring-[#7e6441] ring-opacity-50" 
              : "ring-2 ring-[#4B4B4B] ring-opacity-50"
            : ""
        }`}
      >
        {txt || "\u00A0"}
      </div>
    </motion.div>
  );
};

const PabloTypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="mb-6 flex items-start gap-3"
  >
    <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
      <span className="text-[#666666]">Pablo is thinking</span>
      <div className="flex gap-1">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          className="w-1.5 h-1.5 bg-[#666666] rounded-full"
        />
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          className="w-1.5 h-1.5 bg-[#666666] rounded-full"
        />
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          className="w-1.5 h-1.5 bg-[#666666] rounded-full"
        />
      </div>
    </div>
  </motion.div>
);

// Update the ProcessingNotification for better visibility
const ProcessingNotification = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.2 }}
        className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-blue-100 p-4 flex items-center gap-3 z-[100]"
      >
        <div className="text-[#7e6441]">
          <CreditCard className="w-8 h-7" />
        </div>
        <div>
          <p className="text-gray-700 font-medium">Processing payment...</p>
          <p className="text-sm text-gray-500">Amount: $870.00</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Update the PaymentNotification for better visibility
const PaymentNotification = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.2 }}
        className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-blue-100 p-6 z-[100] w-[400px]"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src="/images/amex-gold-card.png"
              alt="American Express Gold Card"
              className="w-24 h-16 object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Booking Confirmed!</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Amount:</span>
                <span className="font-medium text-gray-900">$870.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Card:</span>
                <span>Amex Gold ****4029</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Property:</span>
                <span>Broadway Gem</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[#7e6441]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Confirmation email sent!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/**************** SCRIPT ****************/
const SCRIPT: { from: "pablo" | "user"; text: string; eff?: (s: DemoState) => DemoState }[] = [
  {
    from: "pablo",
    text: "Hey Marina! How are the kids - 2, 8, 11, 13, 14? Still under $750 budget? Found a perfect 4-bedroom in Midtown for $729/night with city views!",
    eff: (s) => ({ ...s, current: "p1", location: "new-york" }),
  },
  { from: "user", text: "any food place (bakery etc) close by?" },
  {
    from: "pablo",
    text: "Got you covered! Here's another option closer to Times Square - $825/night. A bit over budget but amazing location. Midtown is perfect for your family - thoughts?",
    eff: (s) => ({ ...s, current: "p2" }),
  },
  { from: "user", text: "compare them" },
  {
    from: "pablo",
    text: "First one: Bryant Park views, 7-min walk to restaurants. Second: no park view but cafes downstairs, Smoothie King in lobby. All kids fit comfortably in both!",
    eff: (s) => ({ ...s, compare: true }),
  },
  { from: "user", text: "no flights yet, are dates flexible? Book 2nd option for now, need flexibility w/ dates/cancel; also, need activities w/kids" },
  {
    from: "pablo",
    text: "Perfect! ",
    eff: (s) => ({ ...s, iti: true }),
  },
  {
    from: "pablo",
    text: "Booked! Day 1: Check-in 4pm, visit Urban Bites for lunch, then Bryant Park carousel. I've made a treasure hunt for the kids! Dinner at Skyline Terrace with city views.",
    eff: (s) => ({ ...s, iti: true }),
  },
  {
    from: "pablo",
    text: "Day 2: Morning bagel-making class for all kids (2 hours) OR Hamilton tickets for older ones + science museum for younger. Dinner: Mexican place with GF options, kids make churros! Should I book?",
    eff: (s) => ({ ...s, extras: true }),
  },
];

/**************** MAIN COMPONENT ****************/
export default function PabloDemoLoop() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [state, setState] = useState<DemoState>({
    current: null,
    compare: false,
    iti: false,
    extras: false,
    location: "featured"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Demo controls state
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Add notification state
  const [showBookingConfirmed, setShowBookingConfirmed] = useState(false);
  const [showPaymentProcessed, setShowPaymentProcessed] = useState(false);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/message-sound.mp3');
    audioRef.current.volume = 0.2;
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  // Play sound effect
  const playMessageSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { });
    }
  }, [soundEnabled]);

  // Handle progression to next message
  const progressToNext = useCallback(() => {
    if (!isPlaying || currentMsgIndex >= SCRIPT.length) return;

    const step = SCRIPT[currentMsgIndex];

    if (step.from === "pablo") {
      setTyping(true);
      playMessageSound();

      const typingDuration = 1500 / playbackSpeed;
      setTimeout(() => {
        setTyping(false);
        setMsgs(prev => [...prev, { from: step.from, text: step.text }]);
        setIsTypingMessage(true);

        // Show notifications based on message content
        if (step.text.startsWith("Booked!")) {
          // First show payment processing
          setShowPaymentProcessed(true);
          setTimeout(() => {
            setShowPaymentProcessed(false);
            // Then show booking confirmation
            setTimeout(() => {
              setShowBookingConfirmed(true);
              setTimeout(() => setShowBookingConfirmed(false), 4000);
            }, 500);
          }, 2000);
        }

        // Apply state effects with loading
        if (step.eff) {
          setIsLoading(true);
          setTimeout(() => {
            setState(s => step.eff!(s));
            setIsLoading(false);
          }, 300);
        }
      }, typingDuration);
    } else {
      const userDelay = 800 / playbackSpeed;
      setTimeout(() => {
        playMessageSound();
        setMsgs(prev => [...prev, { from: step.from, text: step.text }]);
        setIsTypingMessage(true);
      }, userDelay);
    }
  }, [currentMsgIndex, isPlaying, playbackSpeed, playMessageSound]);

  // Handle when a message finishes typing
  const handleMessageTyped = useCallback(() => {
    setIsTypingMessage(false);
    setCurrentMsgIndex(prev => prev + 1);
  }, []);

  // Jump to specific message
  const jumpToMessage = useCallback((index: number) => {
    if (index < 0 || index >= SCRIPT.length) return;

    const messagesToShow = SCRIPT.slice(0, index + 1);
    const newMsgs = messagesToShow.map(s => ({ from: s.from, text: s.text }));

    let newState: DemoState = { current: null, compare: false, iti: false, extras: false, location: "featured" };
    messagesToShow.forEach(s => {
      if (s.eff) newState = s.eff(newState);
    });

    setMsgs(newMsgs);
    setState(newState);
    setCurrentMsgIndex(index + 1);
    setTyping(false);
    setIsTypingMessage(false);
  }, []);

  // Start the conversation
  useEffect(() => {
    if (currentMsgIndex === 0 && msgs.length === 0 && isPlaying) {
      progressToNext();
    }
  }, [currentMsgIndex, msgs.length, isPlaying, progressToNext]);

  // Progress when ready for next message
  useEffect(() => {
    if (!isTypingMessage && !typing && currentMsgIndex > 0 && currentMsgIndex < SCRIPT.length && isPlaying) {
      progressToNext();
    }
  }, [currentMsgIndex, isTypingMessage, typing, isPlaying, progressToNext]);

  const reset = () => {
    setMsgs([]);
    setCurrentMsgIndex(0);
    setState({ current: null, compare: false, iti: false, extras: false, location: "featured" });
    setTyping(false);
    setIsTypingMessage(false);
    setIsPlaying(true);
    setIsLoading(false);
  };

  const renderProperties = () => {
    if (state.compare) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <PropertyCard p={PROPS.p1} isLoading={isLoading} />
          <PropertyCard p={PROPS.p2} isLoading={isLoading} />
        </motion.div>
      );
    }
    if (state.current) {
      return <PropertyCard p={PROPS[state.current]} isLoading={isLoading} />;
    }
    return null;
  };

  // Add scroll management
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Prevent default scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Reset scroll when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.location]);

  // Add test function
  const testNotifications = () => {
    setShowPaymentProcessed(true);
    setTimeout(() => {
      setShowPaymentProcessed(false);
      setTimeout(() => {
        setShowBookingConfirmed(true);
        setTimeout(() => setShowBookingConfirmed(false), 4000);
      }, 500);
    }, 2000);
  };

  // Update the useEffect for scrolling
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        const scrollContainer = scrollRef.current.closest('[data-radix-scroll-area-viewport].h-full.w-full');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    };

    // Initial scroll
    scrollToBottom();

    // Set up an interval to keep scrolling while typing
    let scrollInterval: number | null = null;
    if (typing || isTypingMessage) {
      scrollInterval = setInterval(scrollToBottom, 100);
    }

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [msgs, typing, isTypingMessage]);

  const [post, setPost] = useState("");
  /*************** RENDER ***************/
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#F5F1ED]"
    >
      <DashboardMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Add Notifications */}
      <ProcessingNotification show={showPaymentProcessed} />
      <PaymentNotification show={showBookingConfirmed} />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(true)}
              className="hover:bg-[#7e6441] -ml-3"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <img
                  src="/images/pablo-logo.svg"
                  alt="Pablo"
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold tracking-tight text-gray-900">Pablo</span>
                <span className="text-lg text-gray-500 ml-1">Travel</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Add test button */}
            <Button
              variant="outline"
              size="sm"
              onClick={testNotifications}
              className="mr-2"
            >
              Test Notifications
            </Button>
            <Badge variant="outline" className="text-sm">
              {state.location === "new-york" ? "📍 New York" : "🌎 Featured Destinations"}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN - Dynamic Content */}
        <section className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden h-64 bg-[#7e6441]"
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative h-full flex items-center justify-center text-white p-8 text-center">
              <div>
                <h2 className="text-3xl font-light mb-2">
                  {state.location === "new-york" ? "Exploring New York" : "Where will Pablo take you?"}
                </h2>
                <p className="text-lg opacity-90">
                  {state.location === "new-york"
                    ? "Perfect stays for the Kaushan family adventure"
                    : "AI-powered travel planning that knows you"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Properties Section */}
          <AnimatePresence mode="wait">
            {renderProperties()}
          </AnimatePresence>

          {/* Influencers Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Local Experts</h2>
            <div className="space-y-3">
              {INFLUENCERS.map((influencer) => (
                <InfluencerCard key={influencer.id} influencer={influencer} />
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div>
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Travel Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ARTICLES.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Itinerary Section */}
          <AnimatePresence>
            {state.iti && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className=" bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Day 1 – Arrival & Park Fun</h3>
                <div className="space-y-3">
                  {[
                    "Extra 20‑30 min for Friday traffic",
                    "Drop bags with doorman (check‑in 3 pm)",
                    "Lunch: Family Kitchen (GF pizza)",
                    "Central Park scavenger hunt → zoo (red pandas!)",
                    "Wholefoods Columbus Circle – stock fridge",
                    "Dinner: Mo Lounge – park‑view cocktails",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full  bg-[#f5f1ed] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#7e6441]">{i + 1}</span>
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Extra Activities */}
          <AnimatePresence>
            {state.extras && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-green-900">Special Experiences</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-lg mb-2">Broadway Workshop</h4>
                    <p className="text-gray-600 text-sm">Behind-the-scenes dance class for kids (90 min)</p>
                  </Card>
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-lg mb-2">Lion King + Tech Exhibit</h4>
                    <p className="text-gray-600 text-sm">Split the family for age-appropriate fun</p>
                  </Card>
                  <Card className="p-6 hover:shadow-md transition-shadow md:col-span-2">
                    <h4 className="font-semibold text-lg mb-2">Italian Family Dinner</h4>
                    <p className="text-gray-600 text-sm">Private room, GF pasta, kids make their own cannoli!</p>
                  </Card>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </section>

        {/* CHAT COLUMN */}
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
          <Card className="h-full shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-[#7e6441] text-white p-4">              <div className="flex items-center gap-3">                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20">                  <img                     src="/images/pablo-logo.svg"                     alt="Pablo"                     className="w-full h-full object-contain p-1.5"                    onError={(e) => {                      e.currentTarget.style.display = 'none';                      e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-white text-sm font-semibold">P</div>';                    }}                  />                </div>                <div>                  <h3 className="font-semibold">Chat with Pablo</h3>                  <p className="text-xs opacity-90">Your AI Travel Companion</p>                </div>              </div>            </div>

            <div className="relative flex flex-col h-[calc(100%-200px)]">
              <ScrollArea className="flex-1 p-4 h-[calc(100%-200px)] text-start">
                <div className="space-y-1" id="scroll-area-viewport">
                  {msgs.map((m, i) => (
                    <TypeBubble
                      key={i}
                      msg={m}
                      shouldType={i === msgs.length - 1 && isTypingMessage}
                      onDone={i === msgs.length - 1 ? handleMessageTyped : () => { }}
                      speed={playbackSpeed}
                    />
                  ))}
                  <AnimatePresence>{typing && <PabloTypingIndicator key="typing" />}</AnimatePresence>
                  <div ref={scrollRef} className="h-1" />
                </div>
              </ScrollArea>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={reset}
              >
                Restart Demo
              </Button>
            </div>
          </Card>
        </aside>
      </div>

      {/* Demo Controls */}
      <DemoControls
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        progress={Math.max(0, currentMsgIndex - 1)}
        onProgressChange={jumpToMessage}
        speed={playbackSpeed}
        onSpeedChange={(v) => setPlaybackSpeed(parseFloat(v))}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled(!soundEnabled)}
        totalSteps={SCRIPT.length}
      />
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-1 bg-[#f7f4f1] font-serif text-[#333]">
        {/* bottom div code */}
        <div className="p-6 space-y-6">
          <Tabs defaultValue="feed">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="feed">
                <MessageSquareHeart className="mr-2 h-4 w-4" /> Feed
              </TabsTrigger>
              <TabsTrigger value="groups">
                <Users className="mr-2 h-4 w-4" /> Groups
              </TabsTrigger>
              <TabsTrigger value="create">
                <Camera className="mr-2 h-4 w-4" /> Create Post
              </TabsTrigger>
              <TabsTrigger value="explore">
                <Sparkles className="mr-2 h-4 w-4" /> Discover
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 flex gap-4 items-start">
                    <Avatar>
                      <AvatarImage src="/avatars/user1.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Jane Doe</p>
                      <p className="text-sm">"Just got back from Portugal. Here are my fav vegan spots in Lisbon!"</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex gap-4 items-start">
                    <Avatar>
                      <AvatarImage src="/avatars/user2.jpg" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Mark R.</p>
                      <p className="text-sm">"Backpacking across the Balkans? Ask me anything!"</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="groups">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">🌱 Vegan Travelers</p>
                    <p className="text-sm text-muted-foreground">Share plant-based finds from around the globe.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">🎒 Digital Nomads Europe</p>
                    <p className="text-sm text-muted-foreground">Tips, meetups, and work-friendly stays across Europe.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="create">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <Textarea
                    placeholder="Share your travel story, tip or review..."
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                  />
                  <Input type="file" />
                  <Button disabled={!post}>Post</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="explore">
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">Suggested for You</p>
                    <p className="text-sm">Based on your profile: "Eco Stays in Croatia"</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">From Your Groups</p>
                    <p className="text-sm">"Best work cafés in Lisbon" — Digital Nomads Europe</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}