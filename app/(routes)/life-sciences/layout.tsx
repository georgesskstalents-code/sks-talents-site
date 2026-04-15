import LifeSciencesHeader from "./components/header";

export default function LifeSciencesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LifeSciencesHeader />
      {children}
    </>
  );
}
