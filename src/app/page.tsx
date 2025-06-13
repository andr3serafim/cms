import ToggleThemeSwitch from "@/components/ui/toggle/toogle-theme";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 dark:bg-gray-900 gap-3">
      <ToggleThemeSwitch />
      <h1 className="text-2xl font-semibold dark:text-white text-black">Home</h1>
    </div>
  );
}
