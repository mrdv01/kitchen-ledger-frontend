import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const HomePage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)",
      }}
    >
      <section className="bg-white-600 text-black text-center py-24">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-4">
            Track Your Shared Expenses
          </h2>
          <p className="text-xl mb-6 text-gray-400">
            Manage group expenses, track shared purchases, and keep your kitchen
            finances in order with Ledgerly.
          </p>
          <Link
            to="/get-started"
            className="bg-transparent text-black border border-black px-6 py-3 rounded text-lg hover:border-green-400 hover:text-green-400"
          >
            Get Started
          </Link>
        </div>
      </section>
      {/* fetures section */}
      <section id="features" className=" text-center py-24">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-12">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className=" p-6 rounded shadow-lg hover:border hover:border-purple-700">
              <h3 className="text-xl font-semibold mb-4">Expense Tracking</h3>
              <p>
                Easily track shared expenses, and keep everyone in the loop on
                what’s being spent.
              </p>
            </div>
            <div className=" p-6 rounded shadow-lg hover:border hover:border-purple-700">
              <h3 className="text-xl font-semibold mb-4">Budget Management</h3>
              <p>
                Set budgets for each category and monitor spending to ensure you
                stay within limits.
              </p>
            </div>
            <div className=" p-6 rounded shadow-lg hover:border hover:border-purple-700">
              <h3 className="text-xl font-semibold mb-4">Expense Splitting</h3>
              <p>
                Split costs equally or based on individual shares and keep track
                of everyone’s contribution.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
