import ProfileSidebar from "@/components/ProfilePage/ProfileSidebar";

export default async function SpecificLayout({ children }) {
  return (
    <div className="max-w-[1300px] m-auto py-5 sm:py-10">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-5 px-5">
        <ProfileSidebar />
        {children}
      </div>
    </div>
  );
}
