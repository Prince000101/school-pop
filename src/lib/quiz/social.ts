import type { Answer } from "@/lib/math/types";
import type { BankEntry, TopicBank } from "./bank";

const HINTS: Record<string, string> = {
  community: "Think about who helps you in your neighborhood and what they do!",
  days: "Count the days of the week and the months of the year!",
  directions: "Point the way — up, down, left, right and the compass!",
  family: "Think about your family tree and who is who!",
  maps: "Maps show places using symbols, colors and a compass!",
  continents: "Remember the seven continents and the five oceans!",
  money: "Count the coins and know what each one is worth!",
  landmarks: "Think about famous places around the world!",
  capitals: "Every country has a capital city where its leaders work!",
  flags: "Flags use colors and shapes to tell countries apart!",
  government: "Think about leaders, rules, and how people vote!",
};

function e(d: number, text: string, answer: Answer, options: Answer[], hint?: string): BankEntry {
  return { d, text, answer, options, hint: hint ?? "" };
}

function bank(topic: string, hint: string): (d: number, t: string, a: Answer, o: Answer[]) => BankEntry {
  return (d, t, a, o) => e(d, t, a, o, HINTS[hint]);
}

/* ================================================================
   COMMUNITY (Playground · d 1-4)
   ================================================================ */
const co = bank("community", "community");
const communityBank: BankEntry[] = [
  co(1, "Who puts out fires?", "a firefighter", ["a firefighter", "a teacher", "a baker", "a pilot"]),
  co(1, "Who teaches you at school?", "a teacher", ["a teacher", "a doctor", "a chef", "a driver"]),
  co(1, "Who helps sick people get better?", "a doctor", ["a doctor", "a teacher", "a builder", "a farmer"]),
  co(1, "Who keeps the city safe?", "a police officer", ["a police officer", "a singer", "a painter", "a cook"]),
  co(1, "Who flies a plane?", "a pilot", ["a pilot", "a bus driver", "a sailor", "a runner"]),
  co(1, "Who bakes bread?", "a baker", ["a baker", "a teacher", "a pilot", "a police officer"]),
  co(2, "Who brings your letters and packages?", "a mail carrier", ["a mail carrier", "a farmer", "a chef", "a librarian"]),
  co(2, "Who builds houses?", "a builder", ["a builder", "a singer", "a dancer", "a painter"]),
  co(2, "Who cuts and styles your hair?", "a hairdresser", ["a hairdresser", "a vet", "a chef", "a farmer"]),
  co(2, "Who helps animals when they are sick?", "a veterinarian", ["a veterinarian", "a teacher", "a pilot", "a baker"]),
  co(2, "Who grows our food on a farm?", "a farmer", ["a farmer", "a baker", "a chef", "a doctor"]),
  co(2, "Who works at a library and helps you find books?", "a librarian", ["a librarian", "a firefighter", "a pilot", "a builder"]),
  co(3, "Who fixes your teeth?", "a dentist", ["a dentist", "a vet", "a doctor", "a nurse"]),
  co(3, "Who cooks food in a restaurant?", "a chef", ["a chef", "a farmer", "a baker", "a waiter"]),
  co(3, "Who drives a bus with passengers?", "a bus driver", ["a bus driver", "a pilot", "a sailor", "a runner"]),
  co(3, "Who takes care of animals at the zoo?", "a zookeeper", ["a zookeeper", "a vet", "a farmer", "a hunter"]),
  co(3, "Who helps in an ambulance?", "a paramedic", ["a paramedic", "a librarian", "a chef", "a builder"]),
  co(3, "Who sells you food at the store?", "a cashier", ["a cashier", "a farmer", "a chef", "a baker"]),
  co(4, "Who runs the whole country?", "the president", ["the president", "the mayor", "the teacher", "the coach"]),
  co(4, "Who works at the fire station?", "a firefighter", ["a firefighter", "a chef", "a pilot", "a singer"]),
  co(4, "Who protects you at the pool?", "a lifeguard", ["a lifeguard", "a teacher", "a dentist", "a farmer"]),
  co(4, "Who works at the post office?", "a mail carrier", ["a mail carrier", "a lifeguard", "a chef", "a pilot"]),
];

/* ================================================================
   DAYS (Playground · d 1-4)
   ================================================================ */
const dy = bank("days", "days");
const daysBank: BankEntry[] = [
  dy(1, "How many days are in a week?", "7", ["7", "5", "10", "12"]),
  dy(1, "How many months are in a year?", "12", ["12", "10", "7", "24"]),
  dy(1, "Which day comes right after Monday?", "Tuesday", ["Tuesday", "Sunday", "Friday", "Wednesday"]),
  dy(1, "Which day comes right after Friday?", "Saturday", ["Saturday", "Sunday", "Thursday", "Monday"]),
  dy(1, "Which day comes right before Sunday?", "Saturday", ["Saturday", "Monday", "Friday", "Tuesday"]),
  dy(1, "Which day comes right after Sunday?", "Monday", ["Monday", "Saturday", "Tuesday", "Friday"]),
  dy(2, "Which day comes right before Wednesday?", "Tuesday", ["Tuesday", "Thursday", "Monday", "Friday"]),
  dy(2, "Which month starts the year?", "January", ["January", "December", "February", "March"]),
  dy(2, "Which month comes after January?", "February", ["February", "March", "December", "January"]),
  dy(2, "Which month has Halloween?", "October", ["October", "December", "November", "August"]),
  dy(2, "Which month has Christmas?", "December", ["December", "January", "November", "October"]),
  dy(2, "Which is the last month of the year?", "December", ["December", "January", "November", "February"]),
  dy(3, "Which month has the fewest days?", "February", ["February", "January", "April", "June"]),
  dy(3, "What do we call the day before today?", "yesterday", ["yesterday", "tomorrow", "tonight", "next week"]),
  dy(3, "What do we call the day after today?", "tomorrow", ["tomorrow", "yesterday", "last week", "tonight"]),
  dy(3, "Which days are the weekend?", "Saturday and Sunday", ["Saturday and Sunday", "Monday and Tuesday", "Wednesday and Thursday", "Friday only"]),
  dy(3, "Which of these is a school day?", "Wednesday", ["Wednesday", "Saturday", "Sunday", "Holiday"]),
  dy(3, "How many hours are in a day?", "24", ["24", "12", "48", "60"]),
  dy(4, "Which month has Thanksgiving?", "November", ["November", "December", "October", "September"]),
  dy(4, "How many days are in a regular year?", "365", ["365", "360", "400", "300"]),
  dy(4, "Which month comes right before May?", "April", ["April", "March", "June", "July"]),
  dy(4, "Which month comes right after August?", "September", ["September", "July", "October", "November"]),
];

/* ================================================================
   DIRECTIONS (Playground · d 1-4)
   ================================================================ */
const di = bank("directions", "directions");
const directionsBank: BankEntry[] = [
  di(1, "If you go up, the opposite is ____.", "down", ["down", "left", "right", "forward"]),
  di(1, "If you go left, the opposite is ____.", "right", ["right", "left", "up", "down"]),
  di(1, "Which arrow points UP?", "↑", ["↑", "↓", "←", "→"]),
  di(1, "Which arrow points DOWN?", "↓", ["↓", "↑", "←", "→"]),
  di(1, "Which arrow points LEFT?", "←", ["←", "→", "↑", "↓"]),
  di(1, "Which arrow points RIGHT?", "→", ["→", "←", "↑", "↓"]),
  di(2, "When you go up the stairs, you go ____.", "up", ["up", "down", "sideways", "around"]),
  di(2, "When you slide down a slide, you go ____.", "down", ["down", "up", "backward", "upside down"]),
  di(2, "Which hand do you write with most often?", "your right hand", ["your right hand", "your left hand", "both", "neither"]),
  di(2, "Which side is your heart on?", "the left", ["the left", "the right", "the top", "the bottom"]),
  di(3, "The sun rises in the ____.", "east", ["east", "west", "north", "south"]),
  di(3, "The sun sets in the ____.", "west", ["west", "east", "north", "south"]),
  di(3, "A compass points ____.", "north", ["north", "south", "east", "west"]),
  di(3, "Which direction is the opposite of north?", "south", ["south", "east", "west", "up"]),
  di(4, "Which is a cardinal direction?", "north", ["north", "up", "diagonal", "around"]),
  di(4, "If you turn all the way around, you face the ____ way.", "same", ["same", "opposite", "different", "wrong"]),
  di(4, "Which direction do you look when you walk forward?", "straight ahead", ["straight ahead", "behind", "to the side", "at your feet"]),
  di(4, "If the map says 'N' on top, which way is up on the map?", "north", ["north", "south", "east", "west"]),
];

/* ================================================================
   FAMILY (Playground · d 1-4)
   ================================================================ */
const fa = bank("family", "family");
const familyBank: BankEntry[] = [
  fa(1, "Who is your mother's husband?", "your father", ["your father", "your uncle", "your brother", "your grandpa"]),
  fa(1, "Who is your father's wife?", "your mother", ["your mother", "your sister", "your aunt", "your grandma"]),
  fa(1, "Who are the people you live with and love?", "your family", ["your family", "strangers", "your teachers only", "your mail carrier"]),
  fa(1, "Who is a boy in your family that is your sibling?", "your brother", ["your brother", "your uncle", "your cousin", "your dad"]),
  fa(1, "Who is a girl in your family that is your sibling?", "your sister", ["your sister", "your aunt", "your cousin", "your mom"]),
  fa(2, "Who is your mother's mother?", "your grandmother", ["your grandmother", "your aunt", "your sister", "your cousin"]),
  fa(2, "Who is your father's mother?", "your grandmother", ["your grandmother", "your uncle", "your brother", "your niece"]),
  fa(2, "Who is your mother's father?", "your grandfather", ["your grandfather", "your uncle", "your cousin", "your dad"]),
  fa(2, "Who is your father's father?", "your grandfather", ["your grandfather", "your aunt", "your nephew", "your grandpa's friend"]),
  fa(2, "Your parents' parents are your ____.", "grandparents", ["grandparents", "siblings", "cousins", "aunts"]),
  fa(3, "Who is your parent's brother?", "your uncle", ["your uncle", "your aunt", "your cousin", "your grandpa"]),
  fa(3, "Who is your parent's sister?", "your aunt", ["your aunt", "your uncle", "your cousin", "your grandma"]),
  fa(3, "Who is your aunt's child?", "your cousin", ["your cousin", "your sibling", "your nephew", "your uncle"]),
  fa(3, "Your uncle and aunt's children are your ____.", "cousins", ["cousins", "sisters", "brothers", "grandparents"]),
  fa(3, "Who takes care of you every day at home?", "your parents", ["your parents", "your teacher", "your doctor", "the president"]),
  fa(4, "A baby boy is his parents' ____.", "son", ["son", "daughter", "cousin", "uncle"]),
  fa(4, "A baby girl is her parents' ____.", "daughter", ["daughter", "son", "niece", "aunt"]),
  fa(4, "Your mother's sister's daughter is your ____.", "cousin", ["cousin", "sister", "aunt", "daughter"]),
  fa(4, "Who is the youngest person in a family usually?", "the baby", ["the baby", "the grandpa", "the mom", "the dad"]),
];

/* ================================================================
   MAPS (Adventure · d 4-7)
   ================================================================ */
const mp = bank("maps", "maps");
const mapsBank: BankEntry[] = [
  mp(4, "Which tool shows you where places are?", "a map", ["a map", "a clock", "a phone book", "a ruler"]),
  mp(4, "Which tool always points north?", "a compass", ["a compass", "a map", "a watch", "a telescope"]),
  mp(4, "What is a round model of the whole Earth called?", "a globe", ["a globe", "a map", "a compass", "an atlas page"]),
  mp(4, "Which color is usually used for water on a map?", "blue", ["blue", "green", "brown", "red"]),
  mp(4, "Which color is usually used for forests on a map?", "green", ["green", "blue", "red", "black"]),
  mp(5, "What is the little box that explains the symbols called?", "the legend", ["the legend", "the compass", "the scale", "the border"]),
  mp(5, "What do we call the tiny pictures used on a map?", "symbols", ["symbols", "pixels", "stamps", "arrows"]),
  mp(5, "What shows you which way is north on a map?", "the compass rose", ["the compass rose", "the legend", "the scale", "the title"]),
  mp(5, "What tells you how big real places are compared to the map?", "the scale", ["the scale", "the legend", "the title", "the border"]),
  mp(5, "A star on a map usually shows the ____.", "capital city", ["capital city", "smallest town", "tallest tree", "biggest lake"]),
  mp(6, "What is a book of maps called?", "an atlas", ["an atlas", "a dictionary", "a diary", "a newspaper"]),
  mp(6, "Which line goes from the top to the bottom of a map?", "a north-south line", ["a north-south line", "an east-west line", "a diagonal line", "a circle"]),
  mp(6, "The equator is an imaginary line around the ____ of Earth.", "middle", ["middle", "top", "bottom", "side"]),
  mp(6, "What do roads usually look like on a map?", "lines", ["lines", "dots", "stars", "squares"]),
  mp(7, "What do we call an imaginary line that splits Earth in half?", "the equator", ["the equator", "the horizon", "the equator line is imaginary", "the pole"]),
  mp(7, "Which direction is east on a compass?", "right", ["right", "left", "up", "down"]),
  mp(7, "Which direction is west on a compass?", "left", ["left", "right", "up", "down"]),
  mp(7, "What is a map of a small area like your neighborhood called?", "a street map", ["a street map", "a globe", "a world map", "a compass"]),
];

/* ================================================================
   CONTINENTS (Adventure · d 4-7)
   ================================================================ */
const cn = bank("continents", "continents");
const continentsBank: BankEntry[] = [
  cn(4, "How many continents are there?", "7", ["7", "5", "6", "8"]),
  cn(4, "How many oceans are there?", "5", ["5", "4", "7", "3"]),
  cn(4, "Which continent is also a country?", "Australia", ["Australia", "Africa", "Europe", "Asia"]),
  cn(4, "Which continent is the biggest?", "Asia", ["Asia", "Africa", "Europe", "Australia"]),
  cn(4, "Which continent is covered in ice and is the coldest?", "Antarctica", ["Antarctica", "Africa", "Asia", "South America"]),
  cn(5, "Which continent has the USA and Canada?", "North America", ["North America", "South America", "Europe", "Asia"]),
  cn(5, "Which continent has the Amazon rainforest?", "South America", ["South America", "Africa", "Asia", "Australia"]),
  cn(5, "Which continent has the Sahara Desert?", "Africa", ["Africa", "Asia", "Europe", "North America"]),
  cn(5, "Which continent is Egypt on?", "Africa", ["Africa", "Asia", "Europe", "Australia"]),
  cn(5, "Which ocean is the biggest?", "the Pacific", ["the Pacific", "the Atlantic", "the Indian", "the Arctic"]),
  cn(6, "Which continent has the Great Wall of China?", "Asia", ["Asia", "Africa", "Europe", "South America"]),
  cn(6, "Which continent is Brazil on?", "South America", ["South America", "Africa", "North America", "Europe"]),
  cn(6, "Which ocean is between America and Europe?", "the Atlantic", ["the Atlantic", "the Pacific", "the Indian", "the Arctic"]),
  cn(6, "Which ocean is around the North Pole?", "the Arctic", ["the Arctic", "the Pacific", "the Indian", "the Atlantic"]),
  cn(6, "Which continent is the Eiffel Tower on?", "Europe", ["Europe", "Asia", "Africa", "Australia"]),
  cn(7, "Which continent has kangaroos?", "Australia", ["Australia", "Africa", "South America", "Asia"]),
  cn(7, "Which ocean is the deepest?", "the Pacific", ["the Pacific", "the Atlantic", "the Indian", "the Arctic"]),
  cn(7, "Which continent is surrounded by water on all sides?", "Australia", ["Australia", "Asia", "Africa", "Europe"]),
  cn(7, "Which continent is the smallest?", "Australia", ["Australia", "Europe", "Antarctica", "Africa"]),
  cn(7, "How many oceans touch Antarctica?", "3", ["3", "2", "4", "5"]),
];

/* ================================================================
   MONEY (Adventure · d 4-7)
   ================================================================ */
const mo = bank("money", "money");
const moneyBank: BankEntry[] = [
  mo(4, "Which coin is worth 1 cent?", "a penny", ["a penny", "a nickel", "a dime", "a quarter"]),
  mo(4, "Which coin is worth 5 cents?", "a nickel", ["a nickel", "a penny", "a dime", "a quarter"]),
  mo(4, "Which coin is worth 10 cents?", "a dime", ["a dime", "a penny", "a nickel", "a quarter"]),
  mo(4, "Which coin is worth 25 cents?", "a quarter", ["a quarter", "a penny", "a nickel", "a dime"]),
  mo(4, "How many cents are in a dollar?", "100", ["100", "10", "50", "25"]),
  mo(5, "How many pennies make a dollar?", "100", ["100", "50", "25", "10"]),
  mo(5, "How many quarters make a dollar?", "4", ["4", "2", "5", "10"]),
  mo(5, "How many dimes make a dollar?", "10", ["10", "4", "5", "20"]),
  mo(5, "How many nickels make a dollar?", "20", ["20", "10", "4", "5"]),
  mo(5, "Two quarters equal ____.", "50 cents", ["50 cents", "25 cents", "75 cents", "40 cents"]),
  mo(5, "Which coin is the smallest?", "a dime", ["a dime", "a penny", "a nickel", "a quarter"]),
  mo(6, "A quarter plus a dime equals ____.", "35 cents", ["35 cents", "30 cents", "45 cents", "25 cents"]),
  mo(6, "A dime plus a nickel equals ____.", "15 cents", ["15 cents", "10 cents", "20 cents", "25 cents"]),
  mo(6, "A nickel plus a penny equals ____.", "6 cents", ["6 cents", "5 cents", "7 cents", "10 cents"]),
  mo(6, "Which coin is the biggest?", "a quarter", ["a quarter", "a penny", "a dime", "a nickel"]),
  mo(6, "Which one can buy the most?", "5 dollars", ["5 dollars", "5 cents", "1 dollar", "50 cents"]),
  mo(7, "What do we call the paper money in the USA?", "dollars", ["dollars", "coins", "checks", "cards"]),
  mo(7, "Two nickels equal ____.", "10 cents", ["10 cents", "5 cents", "15 cents", "20 cents"]),
  mo(7, "A quarter plus a nickel equals ____.", "30 cents", ["30 cents", "35 cents", "25 cents", "20 cents"]),
  mo(7, "How much is 3 dimes?", "30 cents", ["30 cents", "25 cents", "15 cents", "35 cents"]),
];

/* ================================================================
   LANDMARKS (Adventure · d 4-7)
   ================================================================ */
const lm = bank("landmarks", "landmarks");
const landmarksBank: BankEntry[] = [
  lm(4, "Which landmark is in Paris?", "the Eiffel Tower", ["the Eiffel Tower", "Big Ben", "the Pyramids", "the Statue of Liberty"]),
  lm(4, "Which giant statue is in New York?", "the Statue of Liberty", ["the Statue of Liberty", "the Eiffel Tower", "Big Ben", "the Sphinx"]),
  lm(4, "Which ancient wonder is in Egypt?", "the Pyramids", ["the Pyramids", "the Colosseum", "the Taj Mahal", "the Opera House"]),
  lm(4, "Which famous wall is in China?", "the Great Wall of China", ["the Great Wall of China", "the Berlin Wall", "Hadrian's Wall", "the city wall"]),
  lm(5, "Which famous clock tower is in London?", "Big Ben", ["Big Ben", "the Eiffel Tower", "the Leaning Tower", "the Water Tower"]),
  lm(5, "Which old arena is in Rome?", "the Colosseum", ["the Colosseum", "the Pyramids", "the Sphinx", "the Acropolis"]),
  lm(5, "Which building does the US President live in?", "the White House", ["the White House", "the Capitol", "Buckingham Palace", "the Tower"]),
  lm(5, "Which opera house is in Sydney?", "the Opera House", ["the Opera House", "the Eiffel Tower", "the Colosseum", "the Taj Mahal"]),
  lm(5, "Which tower in Italy leans?", "the Leaning Tower of Pisa", ["the Leaning Tower of Pisa", "the Eiffel Tower", "Big Ben", "the Space Needle"]),
  lm(6, "Which is the tallest mountain in the world?", "Mount Everest", ["Mount Everest", "Mount Fuji", "Kilimanjaro", "Mount Rushmore"]),
  lm(6, "Which temple is in India?", "the Taj Mahal", ["the Taj Mahal", "the Parthenon", "the Colosseum", "the Sphinx"]),
  lm(6, "Which statue stands tall in Rio de Janeiro?", "Christ the Redeemer", ["Christ the Redeemer", "the Statue of Liberty", "the Sphinx", "David"]),
  lm(6, "Which waterfall is between the USA and Canada?", "Niagara Falls", ["Niagara Falls", "Angel Falls", "Victoria Falls", "the Nile"]),
  lm(7, "Which bridge is famous in San Francisco?", "the Golden Gate Bridge", ["the Golden Gate Bridge", "the Brooklyn Bridge", "Tower Bridge", "the London Bridge"]),
  lm(7, "Which ancient city is high in the Andes?", "Machu Picchu", ["Machu Picchu", "Rome", "Athens", "Cairo"]),
  lm(7, "Which stone circle is in England?", "Stonehenge", ["Stonehenge", "the Colosseum", "the Sphinx", "the Moai"]),
  lm(7, "Which giant stone heads are on Easter Island?", "the Moai", ["the Moai", "the Sphinx", "the Statue of Liberty", "the Pyramids"]),
  lm(7, "Which statue is in Egypt and has a lion's body?", "the Sphinx", ["the Sphinx", "the Moai", "the Taj Mahal", "the Colosseum"]),
];

/* ================================================================
   CAPITALS (Champion · d 7-10)
   ================================================================ */
const ca = bank("capitals", "capitals");
const capitalsBank: BankEntry[] = [
  ca(7, "What is the capital of France?", "Paris", ["Paris", "London", "Rome", "Berlin"]),
  ca(7, "What is the capital of the United Kingdom?", "London", ["London", "Paris", "Dublin", "Madrid"]),
  ca(7, "What is the capital of the United States?", "Washington, D.C.", ["Washington, D.C.", "New York", "Los Angeles", "Chicago"]),
  ca(7, "What is the capital of Italy?", "Rome", ["Rome", "Paris", "Milan", "Venice"]),
  ca(7, "What is the capital of Spain?", "Madrid", ["Madrid", "Barcelona", "Lisbon", "Seville"]),
  ca(8, "What is the capital of Germany?", "Berlin", ["Berlin", "Munich", "Vienna", "Hamburg"]),
  ca(8, "What is the capital of Japan?", "Tokyo", ["Tokyo", "Osaka", "Kyoto", "Beijing"]),
  ca(8, "What is the capital of Canada?", "Ottawa", ["Ottawa", "Toronto", "Montreal", "Vancouver"]),
  ca(8, "What is the capital of Australia?", "Canberra", ["Canberra", "Sydney", "Melbourne", "Perth"]),
  ca(8, "What is the capital of Brazil?", "Brasília", ["Brasília", "Rio de Janeiro", "São Paulo", "Buenos Aires"]),
  ca(8, "What is the capital of Mexico?", "Mexico City", ["Mexico City", "Guadalajara", "Cancún", "Monterrey"]),
  ca(9, "What is the capital of China?", "Beijing", ["Beijing", "Shanghai", "Hong Kong", "Tokyo"]),
  ca(9, "What is the capital of Egypt?", "Cairo", ["Cairo", "Alexandria", "Giza", "Luxor"]),
  ca(9, "What is the capital of India?", "New Delhi", ["New Delhi", "Mumbai", "Bangalore", "Kolkata"]),
  ca(9, "What is the capital of Russia?", "Moscow", ["Moscow", "St. Petersburg", "Kiev", "Minsk"]),
  ca(9, "What is the capital of Greece?", "Athens", ["Athens", "Rome", "Sparta", "Crete"]),
  ca(10, "What is the capital of Ireland?", "Dublin", ["Dublin", "Belfast", "Cork", "Galway"]),
  ca(10, "What is the capital of South Korea?", "Seoul", ["Seoul", "Tokyo", "Busan", "Beijing"]),
  ca(10, "What is the capital of Argentina?", "Buenos Aires", ["Buenos Aires", "Santiago", "Lima", "Montevideo"]),
  ca(10, "What is the capital of Kenya?", "Nairobi", ["Nairobi", "Cairo", "Kampala", "Lagos"]),
];

/* ================================================================
   FLAGS (Champion · d 7-10)
   ================================================================ */
const fl = bank("flags", "flags");
const flagsBank: BankEntry[] = [
  fl(7, "Which flag is red with a white circle in the middle?", "Japan's flag", ["Japan's flag", "China's flag", "France's flag", "Italy's flag"]),
  fl(7, "Which flag is red, white, and blue with stars and stripes?", "the USA's flag", ["the USA's flag", "the UK's flag", "Canada's flag", "Japan's flag"]),
  fl(7, "Which flag has a red maple leaf on it?", "Canada's flag", ["Canada's flag", "the USA's flag", "the UK's flag", "Japan's flag"]),
  fl(7, "Which flag has the Union Jack in the corner?", "the UK's flag", ["the UK's flag", "the USA's flag", "Canada's flag", "France's flag"]),
  fl(8, "Which flag is blue with a yellow cross?", "Sweden's flag", ["Sweden's flag", "Norway's flag", "Greece's flag", "Denmark's flag"]),
  fl(8, "Which flag is red with a white cross?", "Denmark's flag", ["Denmark's flag", "Sweden's flag", "Norway's flag", "Greece's flag"]),
  fl(8, "Which flag is green, white, and orange?", "Ireland's flag", ["Ireland's flag", "Italy's flag", "France's flag", "India's flag"]),
  fl(8, "Which flag is blue with a red cross?", "Norway's flag", ["Norway's flag", "Sweden's flag", "Denmark's flag", "Iceland's flag"]),
  fl(8, "Which flag is blue with a white cross?", "Greece's flag", ["Greece's flag", "Sweden's flag", "Norway's flag", "Japan's flag"]),
  fl(9, "Which flag has five yellow stars on a red field?", "China's flag", ["China's flag", "Vietnam's flag", "Japan's flag", "Russia's flag"]),
  fl(9, "Which flag is red with a big yellow star?", "Vietnam's flag", ["Vietnam's flag", "China's flag", "Japan's flag", "Turkey's flag"]),
  fl(9, "Which flag has green, yellow, and red colors?", "Ghana's flag", ["Ghana's flag", "Japan's flag", "Sweden's flag", "Greece's flag"]),
  fl(9, "Which flag is blue with stars and the Union Jack in the corner?", "Australia's flag", ["Australia's flag", "the UK's flag", "the USA's flag", "New Zealand's flag"]),
  fl(9, "Which flag is red, white, and blue with a Union Jack and red stars?", "New Zealand's flag", ["New Zealand's flag", "Australia's flag", "the USA's flag", "the UK's flag"]),
  fl(10, "Which flag has a red dragon on it?", "Wales's flag", ["Wales's flag", "England's flag", "Scotland's flag", "Ireland's flag"]),
  fl(10, "Which flag is white with a red circle? (hint: it's Asian)", "Japan's flag", ["Japan's flag", "Bangladesh's flag", "South Korea's flag", "Vietnam's flag"]),
  fl(10, "Which flag is green with a red circle in the middle?", "Bangladesh's flag", ["Bangladesh's flag", "Japan's flag", "Pakistan's flag", "India's flag"]),
  fl(10, "Which flag has a red field with a white star and is in the Middle East?", "Turkey's flag", ["Turkey's flag", "China's flag", "Japan's flag", "Vietnam's flag"]),
];

/* ================================================================
   GOVERNMENT (Champion · d 7-10)
   ================================================================ */
const go = bank("government", "government");
const governmentBank: BankEntry[] = [
  go(7, "Who is the leader of the whole country?", "the president", ["the president", "the mayor", "the principal", "the coach"]),
  go(7, "Who is the leader of a city?", "the mayor", ["the mayor", "the president", "the senator", "the judge"]),
  go(7, "What is it called when people vote for their leaders?", "an election", ["an election", "a parade", "a birthday", "a game"]),
  go(7, "Who can vote in an election?", "citizens", ["citizens", "only dogs", "only trees", "only kids"]),
  go(7, "What do we call the rules everyone must follow?", "laws", ["laws", "games", "songs", "paintings"]),
  go(8, "Who makes sure people follow the law?", "the police", ["the police", "the teachers", "the chefs", "the pilots"]),
  go(8, "What is a group of people who make laws called?", "congress", ["congress", "a soccer team", "a choir", "a library"]),
  go(8, "What do we call the flag or symbol of a country?", "a national symbol", ["a national symbol", "a sticker", "a trophy", "a ticket"]),
  go(8, "Where does the US President live?", "the White House", ["the White House", "the Capitol", "the Pentagon", "the Library"]),
  go(8, "What does a judge do?", "decides cases in court", ["decides cases in court", "bakes cakes", "drives buses", "grows food"]),
  go(9, "What is money the government collects from people called?", "taxes", ["taxes", "coins", "gifts", "loans"]),
  go(9, "What do taxes pay for?", "schools and roads", ["schools and roads", "candy", "toys", "movie tickets"]),
  go(9, "Who serves and protects the country in the military?", "soldiers", ["soldiers", "chefs", "gardeners", "artists"]),
  go(9, "What does 'democracy' mean?", "rule by the people", ["rule by the people", "rule by one king", "rule by the weather", "no rules at all"]),
  go(9, "Who is the leader of a small town?", "the mayor", ["the mayor", "the president", "the judge", "the general"]),
  go(10, "Which document lists the rights of US citizens?", "the Constitution", ["the Constitution", "a cookbook", "a novel", "a map"]),
  go(10, "How do we choose our leaders fairly?", "by voting", ["by voting", "by age", "by height", "by luck"]),
  go(10, "Who represents your state in the national government?", "senators and representatives", ["senators and representatives", "teachers and chefs", "artists and singers", "athletes and actors"]),
  go(10, "What is it called when leaders meet to make big decisions?", "a government", ["a government", "a picnic", "a race", "a storm"]),
  go(10, "Who protects the President?", "the Secret Service", ["the Secret Service", "the mail carrier", "the school nurse", "the bus driver"]),
];

/* ================================================================
   Registry
   ================================================================ */
export const SOCIAL_BANKS: TopicBank[] = [
  { topic: "community", subject: "social", entries: communityBank },
  { topic: "days", subject: "social", entries: daysBank },
  { topic: "directions", subject: "social", entries: directionsBank },
  { topic: "family", subject: "social", entries: familyBank },
  { topic: "maps", subject: "social", entries: mapsBank },
  { topic: "continents", subject: "social", entries: continentsBank },
  { topic: "money", subject: "social", entries: moneyBank },
  { topic: "landmarks", subject: "social", entries: landmarksBank },
  { topic: "capitals", subject: "social", entries: capitalsBank },
  { topic: "flags", subject: "social", entries: flagsBank },
  { topic: "government", subject: "social", entries: governmentBank },
];
