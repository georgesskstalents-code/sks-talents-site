import AnimalHealthHeader from "./components/header";

export default function AnimalHealthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimalHealthHeader />
      {children}
    </>
  );
}
