import { toPersianNumber } from "@/utils/toPersianNumber";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col m-5">
      <div className="flex flex-col w-full py-10 px-20 h-44 bg-primary rounded-t-2xl">
        <div className="flex justify-between w-full">
          <Image
            src="/images/footer-logo.svg"
            width={150}
            height={40}
            alt="Footer Logo"
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-14 bg-footer rounded-b-2xl">
        <p className="text-white text-sm">
          {toPersianNumber(1403)} تمام حقوق مادی و معنوی این سایت متعلق به
          چیدامو می‌باشد.
        </p>
      </div>
    </div>
  );
}
