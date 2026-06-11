import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASES, getCase, nextCase } from "../../_lib/cases";
import { CaseView } from "./CaseView";

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  if (!caseStudy) return { title: "Works" };
  return { title: caseStudy.title };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  if (!caseStudy) notFound();
  return <CaseView case={caseStudy} next={nextCase(slug)} />;
}
