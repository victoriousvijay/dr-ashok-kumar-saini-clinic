import { Hero } from "@/components/marketing/hero";
import { TrustBar } from "@/components/marketing/trust-bar";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { DoctorIntro } from "@/components/marketing/doctor-intro";
import { ConsultationProcess } from "@/components/marketing/consultation-process";
import { LocationTimings } from "@/components/marketing/location-timings";
import { Faq } from "@/components/marketing/faq";
import { AppointmentCta } from "@/components/marketing/appointment-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <DoctorIntro />
      <ConsultationProcess />
      <LocationTimings />
      <Faq />
      <AppointmentCta />
    </>
  );
}
