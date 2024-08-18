import AuthContextProvider from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContextLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthContextProvider>
      <Header />
      {children}
      <Footer />
    </AuthContextProvider>
  );
};

export default ContextLayout;
