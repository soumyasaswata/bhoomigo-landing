"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { copy, type Lang } from "./copy";

const PHONE = "918984516025";
const DISPLAY_PHONE = "89845 16025";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=Hi%20BhoomiGo%2C%20I%20need%20construction%20materials%20in%20Odisha.%20Delivery%20location%3A%20____.%20Material%3A%20____.%20Quantity%3A%20____.%20Date%3A%20____.`;
const CALL_URL = `tel:+${PHONE}`;

export default function LandingContent() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  return (
    <>
      <main className="min-h-screen">
        {/* Language toggle - fixed top right */}
        <div className="fixed top-4 right-4 z-40">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "odia" : "en")}
            className="rounded-full bg-white/95 shadow-md px-4 py-2.5 text-sm font-medium text-earth-900 hover:bg-white border border-stone-200 transition"
            aria-label={lang === "en" ? "Translate to Odia" : "View in English"}
          >
            {lang === "en" ? t.translateToOdia : t.translateToEnglish}
          </button>
        </div>

        {/* Hero */}
        <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden bg-earth-900">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80"
              alt="Construction site with materials"
              fill
              className="object-cover opacity-50"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-earth-900/70" />
          </div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16 pt-32 text-white max-w-4xl mx-auto w-full text-center">
            <p className="text-sm sm:text-base font-medium text-amber-200/90 uppercase tracking-wider mb-3">
              {t.servingOdisha}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-[#25D366] text-white hover:bg-[#20bd5a] transition shadow-lg"
              >
                <WhatsAppIcon className="w-6 h-6" />
                {t.orderWhatsApp}
              </Link>
              <Link
                href={CALL_URL}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-white text-earth-900 hover:bg-gray-100 transition shadow-lg"
              >
                <CallIcon className="w-5 h-5" />
                {t.callUs}
              </Link>
            </div>
          </div>
        </section>

        {/* What we supply */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-earth-900 text-center mb-4">
              {t.whatWeSupply}
            </h2>
            <p className="text-earth-800/80 text-center max-w-xl mx-auto mb-12">
              {t.whatWeSupplySub}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <SupplyCard
                title={t.stoneChipsTitle}
                description={t.stoneChipsDesc}
                image="/stone_image.jpg"
                imageAlt="Stone chips and aggregates"
              />
              <SupplyCard
                title={t.stoneDustTitle}
                description={t.stoneDustDesc}
                image="/dust_image.jpg"
                imageAlt="Stone dust / quarry dust"
              />
              <SupplyCard
                title={t.bulkSupplyTitle}
                description={t.bulkSupplyDesc}
                image="/bulk_image.jpg"
                imageAlt="Bulk supply for projects"
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-earth-900 text-center mb-4">
              {t.howItWorks}
            </h2>
            <p className="text-earth-800/80 text-center mb-12">{t.howItWorksSub}</p>
            <div className="grid sm:grid-cols-3 gap-8">
              <StepCard step={1} title={t.step1Title} description={t.step1Desc} />
              <StepCard step={2} title={t.step2Title} description={t.step2Desc} />
              <StepCard step={3} title={t.step3Title} description={t.step3Desc} />
            </div>
          </div>
        </section>

        {/* Why BhoomiGo */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-earth-900 text-center mb-4">
              {t.whyBhoomigo}
            </h2>
            <ul className="space-y-4">
              {[t.why1, t.why2, t.why3, t.why4].map((text, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5 text-amber-700" />
                  </span>
                  <span className="text-earth-800">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Service areas */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-earth-900 mb-4">
              {t.serviceAreas}
            </h2>
            <p className="text-lg text-earth-800 mb-2">
              {t.serviceAreasLead}
            </p>
            <p className="text-earth-800/90">{t.serviceAreasDetail}</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-earth-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#25D366] hover:underline"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </Link>
              <Link href={CALL_URL} className="inline-flex items-center gap-2 hover:underline">
                <CallIcon className="w-5 h-5" />
                +91 {DISPLAY_PHONE}
              </Link>
            </div>
            <p className="text-white/80 text-sm">{t.businessHours}</p>
            <p className="text-white/60 text-xs max-w-xl mx-auto">{t.disclaimer}</p>
            <p className="text-white/50 text-sm pt-4">{t.copyright}</p>
          </div>
        </footer>
      </main>

      {/* Sticky WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label={t.chatWhatsApp}
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>
    </>
  );
}

function SupplyCard({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <article className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="relative aspect-[4/3] bg-stone-100">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-earth-900 text-lg mb-2">{title}</h3>
        <p className="text-earth-800/80 text-sm leading-relaxed">{description}</p>
      </div>
    </article>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex w-12 h-12 rounded-full bg-earth-800 text-white font-bold text-lg items-center justify-center mb-4">
        {step}
      </div>
      <h3 className="font-semibold text-earth-900 mb-2">{title}</h3>
      <p className="text-earth-800/80 text-sm">{description}</p>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CallIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
