
import React from "react";
import { Phone, Mail, ChevronDown, Menu, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const navigationItems = [
  { title: "Accueil", url: "/" },
  { title: "À Propos", url: "/apropos" },
  { 
    title: "Prestations", 
    url: "/prestations",
    hasDropdown: true,
    subItems: [
      { title: "📋 Voir Toutes les Prestations", url: "/prestations" },
      { title: "💧 Étanchéité", url: "/prestations#etancheite" },
      { title: "🎨 Peinture", url: "/prestations#peinture" },
      { title: "🚪 Menuiseries", url: "/prestations#menuiseries" },
      { title: "🏠 Charpenterie", url: "/prestations#charpenterie" },
      { title: "📐 Faux Plafonds", url: "/prestations#faux-plafonds" },
      { title: "🌡️ Isolation", url: "/prestations#isolation" },
      { title: "⚡ Électricité", url: "/prestations#electricite" },
      { title: "🔧 Plomberie", url: "/prestations#plomberie" },
    ]
  },
  { 
    title: "Services", 
    url: "/services",
    hasDropdown: true,
    subItems: [
      { title: "📋 Voir Tous les Services", url: "/services" },
      { title: "🏗️ Construction", url: "/services#construction" },
      { title: "🔨 Rénovation", url: "/services#renovation" },
      { title: "🏠 Gestion Immobilière", url: "/services#gestion-immobiliere" },
      { title: "📐 Études & Expertise", url: "/services#etudes-expertise" },
      { title: "✨ Événementiel", url: "/services#evenementiel" },
    ]
  },
  { title: "Programme PACH", url: "/programmepach" },
  { title: "Projets", url: "/projets" },
  { title: "Contact", url: "/contact" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (url) => {
    if (url.includes('#')) {
      return location.pathname === url.split('#')[0];
    }
    return location.pathname === url;
  };

  const navigate = useNavigate();

  const handleSubLinkClick = (e, url) => {
    // Allow Link default when ctrl/meta click or external
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    // Use navigate to ensure location updates (including hash) even if pathname unchanged
    navigate(url);
    // Close mobile sheet if open
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --primary-green: #2d7a4b;
          --light-green: #4a9d6f;
          --accent-green: #e8f5e9;
          --blue-accent: #4d9fb8;
        }
      `}</style>

      {/* Top Bar */}
      <div className="bg-[#2d7a4b] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+22919443509" className="flex items-center gap-1 hover:opacity-80">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+229 01 94 43 50 96</span>
            </a>
            <a href="mailto:bricgroupdivers@gmail.com" className="flex items-center gap-1 hover:opacity-80">
              <Mail className="w-3 h-3" />
              <span className="hidden md:inline">bricgroupdivers@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs hidden md:inline">Cotonou, Bénin</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg backdrop-blur-sm" : "bg-white/95"
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <motion.img whileHover={{ scale: 1.05 }} src="/images/logo-web.jpg" alt="BRIC GROUP AFRICA" className={`w-auto transition-all ${isScrolled ? 'h-10' : 'h-14'}`} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                item.hasDropdown ? (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger asChild>
                      <motion.button whileHover={{ y: -3 }} className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center gap-1 ${
                        isActive(item.url)
                          ? "bg-[#2d7a4b] text-white"
                          : "text-gray-700 hover:bg-[#e8f5e9] hover:text-[#2d7a4b]"
                      }`}
                      >
                        {item.title}
                        <ChevronDown className="w-4 h-4" />
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 bg-white shadow-xl border-none">
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem key={subItem.title} asChild>
                          <Link
                            to={subItem.url}
                            onClick={(e) => handleSubLinkClick(e, subItem.url)}
                            className="w-full px-4 py-3 hover:bg-[#e8f5e9] hover:text-[#2d7a4b] cursor-pointer transition-colors flex items-center gap-2"
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <motion.div key={item.title} whileHover={{ y: -3 }} className="px-2">
                    <div className="relative">
                      <Link
                        to={item.url}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium inline-block ${
                          isActive(item.url)
                            ? "bg-[#2d7a4b] text-white"
                            : "text-gray-700 hover:bg-[#e8f5e9] hover:text-[#2d7a4b]"
                        }`}
                      >
                        {item.title}
                      </Link>
                      <span className={`absolute left-4 right-4 h-0.5 bg-[#2d7a4b] mt-2 transform origin-left transition-transform duration-300 ${isActive(item.url) ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </motion.div>
                )
              ))}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden lg:block">
              <Link to="/programmepach">
                <Button className="bg-[#2d7a4b] hover:bg-[#4a9d6f] text-white">
                  Programme PACH
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-[#2d7a4b]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] transition-transform duration-300">
                <div className="flex flex-col gap-4 mt-8">
                  {navigationItems.map((item) => (
                    <div key={item.title}>
                      <Link
                        to={item.url}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg transition-all font-medium block ${
                          isActive(item.url)
                            ? "bg-[#2d7a4b] text-white"
                            : "text-gray-700 hover:bg-[#e8f5e9]"
                        }`}
                      >
                        {item.title}
                      </Link>
                      {item.hasDropdown && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.subItems.slice(1).map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.url}
                              onClick={(e) => handleSubLinkClick(e, subItem.url)}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-[#2d7a4b] hover:bg-[#e8f5e9] rounded-lg transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Link to="/programmepach" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-[#2d7a4b] hover:bg-[#4a9d6f]">
                      Programme PACH
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <img 
                src="/images/logo-web.jpg" 
                alt="BRIC GROUP"
                className="h-12 mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm">
                Expert en construction, rénovation et gestion immobilière au Bénin et en Afrique.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#4a9d6f]">Liens Rapides</h3>
              <ul className="space-y-2">
                {navigationItems.slice(0, 4).map((item) => (
                  <li key={item.title}>
                    <Link to={item.url} className="text-gray-400 hover:text-[#4a9d6f] transition-colors text-sm">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#4a9d6f]">Nos Prestations</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Étanchéité</li>
                <li>Peinture</li>
                <li>Menuiseries</li>
                <li>Charpenterie</li>
                <li>Programme PACH</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#4a9d6f]">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>Rue 2460A/ Sêtovi, Cotonou</li>
                <li>+229 01 94 43 50 96</li>
                <li>+229 01 60 42 27 83</li>
                <li>bricgroupdivers@gmail.com</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-8 h-8 bg-[#2d7a4b] rounded-full flex items-center justify-center hover:bg-[#4a9d6f] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#2d7a4b] rounded-full flex items-center justify-center hover:bg-[#4a9d6f] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#2d7a4b] rounded-full flex items-center justify-center hover:bg-[#4a9d6f] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 BRIC GROUP AFRICA. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
