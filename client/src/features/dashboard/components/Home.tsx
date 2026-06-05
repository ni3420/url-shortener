import Form from "@/components/Form";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 bg-base-100 dark:bg-zinc-950">
      <div className="w-full max-w-xl bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-base-content/5">
        <Form />
      </div>
    </div>
  );
};

export default Home;