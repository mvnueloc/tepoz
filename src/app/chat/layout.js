import Header from "../components/common/header";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <Header />

      {children}
    </section>
  );
}
