import Footer from "../Footer/Footer";

const AboutPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)",
      }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About Ledgerly</h1>
          <p className="mt-4 text-lg md:text-xl">
            Simplifying shared expenses, so you can focus on what matters.
          </p>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Ledgerly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-transparent rounded-lg shadow-lg hover:border hover:border-purple-700">
              <h3 className="text-xl font-semibold mb-4">Expense Tracking</h3>
              <p>
                Keep track of every expense with ease and ensure transparency
                among all members.
              </p>
            </div>
            <div className="p-6 bg-transparent rounded-lg shadow-lg hover:border hover:border-purple-700">
              <h3 className="text-xl font-semibold mb-4">Budget Insights</h3>
              <p>
                Monitor your budget and get insights into your spending habits.
              </p>
            </div>
            <div className="p-6 bg-transparent rounded-lg shadow-lg hover:border hover:border-purple-700">
              <h3 className="text-xl font-semibold mb-4">Easy Collaboration</h3>
              <p>
                Share expenses with flatmates and avoid conflicts over shared
                purchases.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
