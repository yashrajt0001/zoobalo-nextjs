import Footer from '@/components/Footer';
import { Hero } from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks';
import { MainSection } from '@/components/MainSection'
import Order from '@/components/Order';
import TiffinPicks from '@/components/TiffinPicks';

export default function Home() {
  return (
    <div>
      <Hero />
      <MainSection />
      <TiffinPicks />
      <HowItWorks />
      <Order />
      <Footer />
    </div>
  );
}
