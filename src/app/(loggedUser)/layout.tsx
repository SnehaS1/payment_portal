import PersistentDrawerLeft from "../_components/NavbarDrawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="bg-white w-full lg:px-10">
        <PersistentDrawerLeft>{children}</PersistentDrawerLeft>
      </main>
    </>
  );
}
