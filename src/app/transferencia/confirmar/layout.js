import Header from "../../components/common/header";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section className="w-full h-full p-0 m-0 flex flex-col">
      <Header name={"Transacción"}/>

      {children}
    </section>
  );
}
