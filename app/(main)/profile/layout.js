import ProfileSidebar from "@/components/ProfilePage/ProfileSidebar";

export default async function SpecificLayout({ children }) {
  return (
    <div className="max-w-[1250px] m-auto py-10">
      <div className="flex flex-row gap-5">
        <ProfileSidebar />
        {children}
      </div>
    </div>
  );
}
