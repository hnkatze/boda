import { Heart, Mail, Shirt } from "lucide-react";

interface CardsTitleProps {
  title: string;
  icons: number;
  description: string;
}

export function CardsTitle(data: CardsTitleProps) {
  return (
    <>
      <div className=" w-[358px] h-[392px] py-2 shadow-lg rounded-lg flex flex-col items-center justify-center p-4 md:p-8 bg-white">
        <div className="flex items-center justify-center mt-4 space-x-2">
          {data.icons === 1 && (
            <Heart className="w-12 h-12 text-rose-800 animate-pulse" />
          )}
          {data.icons === 2 && (
            <Mail className="w-12 h-12 text-rose-800 animate-pulse" />
          )}
          {data.icons === 3 && (
            <Shirt className="w-12 h-12 text-rose-800 animate-pulse" />
          )}
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl md:text-4xl font-dancing lg:text-5xl font-bold text-rose-800">
            {data.title}
          </span>
        </div>
        <div className="flex items-center justify-center mb-2">
          <span className="text-lg md:text-lg text-gray-800 font-serif text-center">
            {data.description}
          </span>
        </div>
      </div>
    </>
  );
}
