// PabloDemoLoop.tsx — Production-quality MVP with active content
import { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, MapPin, Wifi, Coffee,
  Dumbbell, Car, Baby, Gamepad2, Menu, X, MessageSquare,
  Inbox, Image as ImageIcon, User, Edit, Star, Heart,
  Bookmark, TrendingUp, Calendar, ChevronRight, CreditCard,
  CheckCircle2, Instagram, Facebook, Twitter, Sparkles, Lock,
} from "lucide-react";

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
  showAuthPopup: boolean;
  isPersonalized: boolean;
}

/**************** STATIC DATA ****************/
// Generic properties for initial state
const GENERIC_PROPS: Record<string, Property> = {
  generic1: {
    id: "generic1",
    title: "Luxury Beachfront Villa",
    price: "$650/night",
    desc: "Stunning oceanview property with private beach access.",
    images: [
      "/images/beach-villa-1.jpg",
      "/images/beach-villa-2.jpg",
      "/images/beach-villa-3.jpg"
    ],
    amenities: [
      { id: "wifi", icon: <Wifi className="w-4 h-4" />, name: "High-Speed WiFi" },
      { id: "pool", icon: <Coffee className="w-4 h-4" />, name: "Private Pool" },
      { id: "parking", icon: <Car className="w-4 h-4" />, name: "Parking" },
    ],
    location: "Malibu, California",
    rating: 4.8,
    reviews: 234
  },
  generic2: {
    id: "generic2",
    title: "Mountain Retreat Cabin",
    price: "$420/night",
    desc: "Cozy cabin surrounded by nature, perfect for relaxation.",
    images: [
      "/images/mountain-cabin-1.jpg",
      "/images/mountain-cabin-2.jpg",
      "/images/mountain-cabin-3.jpg"
    ],
    amenities: [
      { id: "wifi", icon: <Wifi className="w-4 h-4" />, name: "WiFi" },
      { id: "fireplace", icon: <Coffee className="w-4 h-4" />, name: "Fireplace" },
      { id: "hiking", icon: <Dumbbell className="w-4 h-4" />, name: "Hiking Trails" },
    ],
    location: "Aspen, Colorado",
    rating: 4.9,
    reviews: 156
  },
};

// Personalized properties (existing ones renamed)
const PERSONALIZED_PROPS: Record<string, Property> = {
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

// Add Social Auth Popup component
const SocialAuthPopup = ({ show, onClose, onAuthorize }: { show: boolean; onClose: () => void; onAuthorize: () => void }) => (
  <AnimatePresence>
    {show && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 z-50 w-[450px]"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#F5F1ED] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#7e6441]" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connect Your Social Media</h2>
            <p className="text-gray-600">Let Pablo personalize your travel recommendations based on your interests and preferences</p>
          </div>

          <div className="space-y-3 mb-6">
            <button 
              onClick={onAuthorize}
              className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Instagram className="w-5 h-5 text-pink-600" />
              <span className="flex-1 text-left font-medium">Connect Instagram</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="flex-1 text-left font-medium">Connect Facebook</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
              <Twitter className="w-5 h-5 text-sky-500" />
              <span className="flex-1 text-left font-medium">Connect Twitter</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-800">Your data is secure and only used to enhance your experience</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Maybe Later
            </Button>
            <Button onClick={onAuthorize} className="flex-1 bg-[#7e6441] hover:bg-[#6a5637]">
              <Sparkles className="w-4 h-4 mr-2" />
              Authorize & Personalize
            </Button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Add Loading Animation component
const PersonalizingLoader = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/90 backdrop-blur z-50 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-4 border-[#f5f1ed] border-t-[#7e6441] mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your preferences...</h3>
          <p className="text-gray-600">Pablo is creating personalized recommendations just for you</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Add Demo Request Popup component
// const DemoRequestPopup = ({ 
//   show, 
//   onClose, 
//   onSubmit, 
//   initialMessage 
// }: { 
//   show: boolean; 
//   onClose: () => void; 
//   onSubmit: (data: any) => void;
//   initialMessage: string;
// }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     message: initialMessage
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {show && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 z-50 w-[500px] max-h-[90vh] overflow-y-auto"
//           >
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-[#F5F1ED] rounded-full flex items-center justify-center mx-auto mb-4">
//                 <MessageSquare className="w-8 h-8 text-[#7e6441]" />
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-900 mb-2">Request a Demo</h2>
//               <p className="text-gray-600">Let's set up a personalized demo to show you how Pablo can transform your travel experience</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     required
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     required
//                     type="email"
//                     placeholder="john@example.com"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     type="tel"
//                     placeholder="+1 (555) 123-4567"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Company
//                 </label>
//                 <div className="relative">
//                   <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     placeholder="Your Company"
//                     value={formData.company}
//                     onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Message
//                 </label>
//                 <Input
//                   placeholder="Tell us about your travel needs..."
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   className="resize-none"
//                 />
//               </div>

//               <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
//                 <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
//                 <p className="text-sm text-green-800">We'll contact you within 24 hours to schedule your demo</p>
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <Button type="button" variant="outline" onClick={onClose} className="flex-1">
//                   Cancel
//                 </Button>
//                 <Button type="submit" className="flex-1 bg-[#7e6441] hover:bg-[#6a5637]">
//                   <Send className="w-4 h-4 mr-2" />
//                   Request Demo
//                 </Button>
//               </div>
//             </form>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// Add Customer Input Section component
// const CustomerInputSection = ({ onRequestDemo }: { onRequestDemo: (message: string) => void }) => {
//   const [message, setMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSubmit = () => {
//     if (message.trim()) {
//       onRequestDemo(message);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-lg p-8 mb-8"
//     >
//       <div className="text-center mb-6">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-2">
//           Tell Us About Your Travel Dreams
//         </h3>
//         <p className="text-gray-600">
//           Share what kind of experiences you're looking for, and let's create something amazing together
//         </p>
//       </div>

//       <div className="space-y-4">
//         <Input
//           placeholder="I'm looking for family-friendly destinations with activities for kids..."
//           value={message}
//           onChange={(e) => {
//             setMessage(e.target.value);
//             setIsTyping(true);
//             setTimeout(() => setIsTyping(false), 1000);
//           }}
//           className="resize-none text-lg"
//         />

//         <div className="flex items-center justify-between">
//           <AnimatePresence>
//             {isTyping && (
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="text-sm text-gray-500"
//               >
//                 Pablo is listening...
//               </motion.p>
//             )}
//           </AnimatePresence>

//           <Button
//             onClick={handleSubmit}
//             disabled={!message.trim()}
//             className="ml-auto bg-[#7e6441] hover:bg-[#6a5637] disabled:opacity-50"
//           >
//             <MessageSquare className="w-4 h-4 mr-2" />
//             Request Personalized Demo
//           </Button>
//         </div>
//       </div>

//       {message.trim() && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           className="mt-4 p-4 bg-[#F5F1ED] rounded-lg"
//         >
//           <p className="text-sm text-[#7e6441]">
//             <Sparkles className="w-4 h-4 inline mr-1" />
//             Great! Click the button above to get your personalized demo based on your interests.
//           </p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

/**************** SCRIPT ****************/
const SCRIPT: { from: "pablo" | "user"; text: string; eff?: (s: DemoState) => DemoState }[] = [
  {
    from: "pablo",
    text: "Hey there! I'm Pablo, your AI travel companion. I help travelers find perfect stays and create amazing experiences. What brings you here today?",
  },
  { 
    from: "user", 
    text: "Hi Pablo! Looking for some travel inspiration" 
  },
  {
    from: "pablo",
    text: "Great! I'd love to help you discover something truly special. You know, I can create much more personalized recommendations if I could learn a bit about your interests and travel style. Would you mind if I connected with your social media? It helps me understand what you love and suggest places you'll absolutely adore! 🌟",
    eff: (s) => ({ ...s, showAuthPopup: true }),
  },
  { 
    from: "user", 
    text: "Sure, that sounds helpful!" 
  },
  {
    from: "pablo",
    text: "Fantastic! I've analyzed your posts and I'm already excited about what I found! I see you're a family traveler with 5 kids (wow!), you love gaming setups for the older ones, and healthy food options are important. Based on your recent posts about wanting a New York adventure, I've found some PERFECT options for you!",
    eff: (s) => ({ ...s, current: "p1", location: "new-york", isPersonalized: true }),
  },
  {
    from: "pablo",
    text: "Check out this 4-BDR Upper West Side apartment – $789/night – it has the gaming corner your boys will love (just like that Palm Beach resort you posted about!), plus a stunning park view from the master bedroom. The location is perfect for families, close to Central Park and the Natural History Museum. Want to see more details?",
    eff: (s) => ({ ...s, current: "p1" }),
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
    location: "featured",
    showAuthPopup: false,
    isPersonalized: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPersonalizing, setShowPersonalizing] = useState(false);

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
        if (step.text.startsWith("Booking = done!")) {
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

    let newState: DemoState = { current: null, compare: false, iti: false, extras: false, location: "featured", showAuthPopup: false, isPersonalized: false };
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
    setState({ current: null, compare: false, iti: false, extras: false, location: "featured", showAuthPopup: false, isPersonalized: false });
    setTyping(false);
    setIsTypingMessage(false);
    setIsPlaying(true);
    setIsLoading(false);
  };

  const renderProperties = () => {
    // const propsToUse = state.isPersonalized ? PERSONALIZED_PROPS : GENERIC_PROPS;
    
    if (state.isPersonalized && state.compare) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <PropertyCard p={PERSONALIZED_PROPS.p1} isLoading={isLoading} />
          <PropertyCard p={PERSONALIZED_PROPS.p2} isLoading={isLoading} />
        </motion.div>
      );
    }
    
    if (state.isPersonalized && state.current) {
      return <PropertyCard p={PERSONALIZED_PROPS[state.current]} isLoading={isLoading} />;
    }
    
    // Show generic properties initially
    if (!state.isPersonalized) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <PropertyCard p={GENERIC_PROPS.generic1} isLoading={isLoading} />
          <PropertyCard p={GENERIC_PROPS.generic2} isLoading={isLoading} />
        </motion.div>
      );
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
//   const testNotifications = () => {
//     setShowPaymentProcessed(true);
//     setTimeout(() => {
//       setShowPaymentProcessed(false);
//       setTimeout(() => {
//         setShowBookingConfirmed(true);
//         setTimeout(() => setShowBookingConfirmed(false), 4000);
//       }, 500);
//     }, 2000);
//   };

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

  // Handle authorization
  const handleAuthorize = () => {
    setState(s => ({ ...s, showAuthPopup: false }));
    setShowPersonalizing(true);
    
    // Simulate loading and then continue conversation
    setTimeout(() => {
      setShowPersonalizing(false);
      // Continue with next message
      if (currentMsgIndex < SCRIPT.length - 1) {
        setCurrentMsgIndex(currentMsgIndex + 1);
      }
    }, 3000);
  };

  /*************** RENDER ***************/
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#F5F1ED]"
    >
      <DashboardMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      {/* Add Auth Popup */}
      <SocialAuthPopup 
        show={state.showAuthPopup} 
        onClose={() => setState(s => ({ ...s, showAuthPopup: false }))}
        onAuthorize={handleAuthorize}
      />
      
      {/* Add Personalizing Loader */}
      <PersonalizingLoader show={showPersonalizing} />

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
            {state.isPersonalized && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Sparkles className="w-3 h-3 mr-1" />
                Personalized for You
              </Badge>
            )}
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
                  {state.isPersonalized 
                    ? (state.location === "new-york" ? "Your Perfect NYC Family Adventure" : "Curated Just for You")
                    : "Discover Amazing Destinations"}
                </h2>
                <p className="text-lg opacity-90">
                  {state.isPersonalized
                    ? "Personalized recommendations based on your interests"
                    : "AI-powered travel planning that learns what you love"}
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
  );
}