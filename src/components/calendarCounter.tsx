import '@/styles/calendar.css'
export function CalendarCounter() {
  const junArray: string[] = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
  ];
  
  const daysWeek: string[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:p-8">
      <div className="w-full lg:w-[70%] grid grid-cols-7 gap-4 p-4 md:p-8">
        {daysWeek.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="bg-white/80 backdrop-blur-sm w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center "
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="font-serif text-xl md:text-2xl text-rose-800">
                {day}
              </span>
            </div>
          </div>
        ))}
        
        {junArray.map((day, index) => {
          const isSpecialDay = day === "21";
          const gridIndex = index + daysWeek.length;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`backdrop-blur-sm w-12 h-12 md:w-16 md:h-16 lg:rounded-lg flex items-center justify-center lg:shadow-md
                  ${isSpecialDay 
                    ? "bg-gradient-to-br from-rose-300 to-rose-700 rounded-xl animate-pulse ring-2 ring-rose-900"
                    : "bg-white/80 animate-fade-in"}
                  `}
                style={{ 
                  animationDelay: `${gridIndex * 50}ms`,
                  opacity: isSpecialDay ? 1 : 0 
                }}
              >
                <span className={`font-serif text-xl md:text-2xl ${
                  isSpecialDay ? "text-white" : "text-rose-800"
                }`}>
                  {day}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
}