import type { Answer } from "@/lib/math/types";
import type { BankEntry, TopicBank } from "./bank";

const HINTS: Record<string, string> = {
  animals: "Think about what the animal looks like, sounds like, or where it lives!",
  colors: "Picture the object — what color is it in real life?",
  food: "Think about where food comes from and whether it's a fruit, vegetable or snack!",
  habitats: "Think about where each animal is happiest and safest!",
  matter: "Is it hard, runny, or puffy? That tells you solid, liquid or gas!",
  weather: "Look outside — what is the sky doing today?",
  plants: "Think about what a seed needs to sprout and grow!",
  body: "Point to the part of your body the question is about!",
  space: "Remember the planets and what is out in the night sky!",
  machines: "Ask: does it pull, push, cut, lift or twist?",
  ecosystems: "Think about who eats what — the food chain!",
  forces: "Is something being pushed, pulled, or does gravity matter?",
};

function e(d: number, text: string, answer: Answer, options: Answer[], hint?: string): BankEntry {
  return { d, text, answer, options, hint: hint ?? "" };
}

function bank(topic: string, hint: string): (d: number, t: string, a: Answer, o: Answer[]) => BankEntry {
  return (d, t, a, o) => e(d, t, a, o, HINTS[hint]);
}

/* ================================================================
   ANIMALS (Playground · d 1-4)
   ================================================================ */
const a = bank("animals", "animals");
const animalsBank: BankEntry[] = [
  a(1, "Which animal says 'moo'?", "cow", ["cow", "horse", "cat", "dog"]),
  a(1, "Which animal says 'quack'?", "duck", ["duck", "pig", "sheep", "chicken"]),
  a(1, "Which animal says 'woof'?", "dog", ["dog", "cat", "cow", "frog"]),
  a(1, "Which animal says 'meow'?", "cat", ["cat", "dog", "duck", "goat"]),
  a(1, "Which animal says 'baa'?", "sheep", ["sheep", "horse", "pig", "cow"]),
  a(1, "Which animal says 'oink'?", "pig", ["pig", "sheep", "duck", "cow"]),
  a(2, "Which animal has a long trunk?", "elephant", ["elephant", "giraffe", "zebra", "lion"]),
  a(2, "Which animal has black and white stripes?", "zebra", ["zebra", "tiger", "cow", "panda"]),
  a(2, "Which animal has a very long neck?", "giraffe", ["giraffe", "elephant", "camel", "horse"]),
  a(2, "Which animal can fly and has feathers?", "bird", ["bird", "fish", "frog", "rabbit"]),
  a(2, "Which animal swims in the water and has fins?", "fish", ["fish", "bird", "turtle", "cat"]),
  a(2, "Which animal hops and has a pouch for its baby?", "kangaroo", ["kangaroo", "rabbit", "frog", "koala"]),
  a(3, "Which animal says 'neigh'?", "horse", ["horse", "donkey", "cow", "sheep"]),
  a(3, "Which animal is a big cat with orange fur and black stripes?", "tiger", ["tiger", "lion", "leopard", "cheetah"]),
  a(3, "Which animal is called the king of the jungle?", "lion", ["lion", "tiger", "elephant", "bear"]),
  a(3, "Which animal has a hard shell on its back?", "turtle", ["turtle", "snail", "crab", "fish"]),
  a(3, "Which animal says 'ribbit' and lives near water?", "frog", ["frog", "toad", "duck", "lizard"]),
  a(3, "Which animal likes to climb trees and eat bananas?", "monkey", ["monkey", "gorilla", "kangaroo", "lemur"]),
  a(3, "Which animal lives in a hive and makes honey?", "bee", ["bee", "ant", "wasp", "fly"]),
  a(4, "What is the biggest animal in the sea?", "whale", ["whale", "shark", "dolphin", "octopus"]),
  a(4, "Which animal has eight legs?", "spider", ["spider", "insect", "snake", "crab"]),
  a(4, "Which animal is a baby dog?", "puppy", ["puppy", "kitten", "cub", "calf"]),
  a(4, "Which animal is a baby cat?", "kitten", ["kitten", "puppy", "cub", "foal"]),
  a(4, "Which animal is a baby sheep?", "lamb", ["lamb", "chick", "calf", "kid"]),
  a(4, "Which animal is a baby chicken?", "chick", ["chick", "lamb", "duckling", "gosling"]),
  a(4, "Which animal gives us milk?", "cow", ["cow", "dog", "cat", "bird"]),
  a(4, "Which animal is the biggest land animal?", "elephant", ["elephant", "rhino", "hippo", "giraffe"]),
  a(4, "Which animal is a baby cow?", "calf", ["calf", "lamb", "kid", "foal"]),
  a(4, "Which animal is a baby horse?", "foal", ["foal", "calf", "lamb", "piglet"]),
  a(4, "Which animal has a white fluffy coat and says 'baa'?", "sheep", ["sheep", "goat", "cow", "llama"]),
  a(4, "Which animal sleeps standing up and lives on a farm?", "horse", ["horse", "dog", "cat", "duck"]),
];

/* ================================================================
   COLORS (Playground · d 1-4)
   ================================================================ */
const c = bank("colors", "colors");
const colorsBank: BankEntry[] = [
  c(1, "What color is the sun in the sky?", "yellow", ["yellow", "blue", "green", "black"]),
  c(1, "What color is grass?", "green", ["green", "red", "blue", "yellow"]),
  c(1, "What color is the sky on a clear day?", "blue", ["blue", "green", "orange", "pink"]),
  c(1, "What color is a strawberry?", "red", ["red", "blue", "green", "yellow"]),
  c(1, "What color is a banana?", "yellow", ["yellow", "red", "purple", "green"]),
  c(1, "What color is an orange?", "orange", ["orange", "red", "yellow", "green"]),
  c(1, "What color is chocolate?", "brown", ["brown", "black", "red", "blue"]),
  c(1, "What color are fluffy clouds?", "white", ["white", "gray", "blue", "pink"]),
  c(2, "What color is a ripe, sweet apple?", "red", ["red", "blue", "purple", "black"]),
  c(2, "What color is a carrot?", "orange", ["orange", "red", "yellow", "green"]),
  c(2, "What color is a blueberry?", "blue", ["blue", "purple", "green", "black"]),
  c(2, "What color is a little piggy?", "pink", ["pink", "red", "white", "gray"]),
  c(2, "What color is a tree trunk?", "brown", ["brown", "green", "orange", "yellow"]),
  c(2, "What color is an eggplant?", "purple", ["purple", "green", "black", "blue"]),
  c(2, "What color is a tiger's fur?", "orange", ["orange", "yellow", "brown", "red"]),
  c(2, "What color is a stop sign?", "red", ["red", "yellow", "green", "blue"]),
  c(2, "What color is a pumpkin?", "orange", ["orange", "red", "yellow", "brown"]),
  c(3, "What color do you get when you mix blue and yellow?", "green", ["green", "purple", "orange", "brown"]),
  c(3, "What color do you get when you mix red and white?", "pink", ["pink", "purple", "orange", "gray"]),
  c(3, "What color do you get when you mix red and yellow?", "orange", ["orange", "green", "purple", "brown"]),
  c(3, "What color do you get when you mix red and blue?", "purple", ["purple", "green", "orange", "brown"]),
  c(3, "What color do you get when you mix black and white?", "gray", ["gray", "brown", "silver", "beige"]),
  c(4, "What color is the inside of a watermelon?", "red", ["red", "green", "yellow", "pink"]),
  c(4, "What is the top color of a rainbow?", "red", ["red", "orange", "yellow", "green"]),
  c(4, "Which color is the darkest?", "black", ["black", "brown", "gray", "navy"]),
  c(4, "What color are a panda's patches?", "black", ["black", "brown", "gray", "blue"]),
  c(4, "What color is a lemon?", "yellow", ["yellow", "green", "orange", "lime"]),
  c(4, "What color is the moon at night?", "white", ["white", "gray", "silver", "blue"]),
];

/* ================================================================
   FOOD (Playground · d 1-4)
   ================================================================ */
const f = bank("food", "food");
const foodBank: BankEntry[] = [
  f(1, "Which one is a fruit?", "apple", ["apple", "carrot", "bread", "egg"]),
  f(1, "Which one is a vegetable?", "carrot", ["carrot", "apple", "banana", "cake"]),
  f(1, "Which one do we drink?", "milk", ["milk", "bread", "egg", "carrot"]),
  f(1, "Which one is a dairy food?", "cheese", ["cheese", "apple", "rice", "potato"]),
  f(1, "Which one is a fruit that is yellow and long?", "banana", ["banana", "carrot", "corn", "lemon"]),
  f(1, "Which one is a sweet treat?", "cake", ["cake", "broccoli", "rice", "egg"]),
  f(1, "Which food do bees make?", "honey", ["honey", "butter", "jam", "milk"]),
  f(2, "Which one grows underground?", "potato", ["potato", "apple", "tomato", "banana"]),
  f(2, "Which one is made from milk?", "cheese", ["cheese", "bread", "rice", "corn"]),
  f(2, "Which one is green and looks like a little tree?", "broccoli", ["broccoli", "cauliflower", "spinach", "celery"]),
  f(2, "Which fruit is green on the outside and red inside?", "watermelon", ["watermelon", "apple", "pear", "kiwi"]),
  f(2, "Which food comes from a chicken?", "egg", ["egg", "milk", "bread", "honey"]),
  f(2, "Which one is a healthy drink?", "water", ["water", "soda", "juice box", "milkshake"]),
  f(2, "Which one is made from flour and baked?", "bread", ["bread", "cheese", "egg", "carrot"]),
  f(3, "Which one is a grain that you eat with a fork?", "rice", ["rice", "apple", "carrot", "cheese"]),
  f(3, "Which fruit is small, round, and green or red?", "grape", ["grape", "watermelon", "pineapple", "mango"]),
  f(3, "Which vegetable is orange and good for your eyes?", "carrot", ["carrot", "potato", "corn", "celery"]),
  f(3, "Which fruit is fuzzy on the outside?", "peach", ["peach", "plum", "apple", "orange"]),
  f(3, "Which food is made by popping corn?", "popcorn", ["popcorn", "rice cake", "bread", "oatmeal"]),
  f(3, "Which one is a cold dessert made from cream?", "ice cream", ["ice cream", "cake", "jello", "yogurt"]),
  f(3, "Which one is a healthy snack?", "apple", ["apple", "candy", "chips", "soda"]),
  f(4, "Which fruit is red with tiny seeds on the outside?", "strawberry", ["strawberry", "cherry", "raspberry", "apple"]),
  f(4, "Which one has a big pit in the middle?", "cherry", ["cherry", "banana", "grape", "blueberry"]),
  f(4, "Which fruit is yellow and sour, good in lemonade?", "lemon", ["lemon", "lime", "orange", "grapefruit"]),
  f(4, "Which one is made from ground-up grains?", "cereal", ["cereal", "cheese", "egg", "milk"]),
  f(4, "Which vegetable is green and crunchy, a favorite of bunnies?", "celery", ["celery", "carrot", "cucumber", "lettuce"]),
  f(4, "Which one is a healthy lunch?", "salad", ["salad", "chocolate bar", "soda", "chips"]),
  f(4, "Which fruit is tropical and has a spiky outside?", "pineapple", ["pineapple", "banana", "coconut", "mango"]),
  f(4, "Which one should you eat MOST of every day?", "fruits and veggies", ["fruits and veggies", "candy", "soda", "cookies"]),
];

/* ================================================================
   HABITATS (Adventure · d 4-7)
   ================================================================ */
const h = bank("habitats", "habitats");
const habitatsBank: BankEntry[] = [
  h(4, "Where does a fish live?", "the ocean", ["the ocean", "the desert", "the mountain", "a hive"]),
  h(4, "Where does a polar bear live?", "cold, snowy places", ["cold, snowy places", "the desert", "the jungle", "the ocean"]),
  h(4, "Where does a camel live?", "the desert", ["the desert", "the ocean", "the forest", "a cave"]),
  h(4, "Where does a monkey live?", "the jungle", ["the jungle", "the desert", "the ocean", "a hive"]),
  h(4, "Where does a bee live?", "a hive", ["a hive", "the ocean", "a burrow", "the desert"]),
  h(4, "Where does a whale live?", "the ocean", ["the ocean", "the desert", "the jungle", "a cave"]),
  h(5, "Where does a squirrel make its home?", "in a tree", ["in a tree", "in the ocean", "in a hive", "in the desert"]),
  h(5, "Where does a frog live when it's happy?", "near water", ["near water", "in the desert", "on a mountain", "in a hive"]),
  h(5, "Where does a mole make its home?", "underground", ["underground", "in a tree", "in the ocean", "in a hive"]),
  h(5, "Which habitat is very dry and sandy?", "the desert", ["the desert", "the ocean", "the rainforest", "the arctic"]),
  h(5, "Which habitat is very cold and icy?", "the arctic", ["the arctic", "the desert", "the rainforest", "the meadow"]),
  h(5, "Which habitat is full of tall trees?", "the forest", ["the forest", "the ocean", "the desert", "the tundra"]),
  h(5, "Which habitat is mostly water?", "the ocean", ["the ocean", "the desert", "the forest", "the mountain"]),
  h(6, "Which habitat has lots of rain and very tall trees?", "the rainforest", ["the rainforest", "the desert", "the arctic", "the savanna"]),
  h(6, "Where do tropical fish like to hide?", "a coral reef", ["a coral reef", "a desert", "a hive", "a burrow"]),
  h(6, "Where does an eagle build its nest?", "on a high cliff", ["on a high cliff", "in the ocean", "underground", "in a hive"]),
  h(6, "Which plant grows best in the desert?", "the cactus", ["the cactus", "the fern", "the palm tree", "the water lily"]),
  h(6, "Where does a penguin live?", "cold, icy places", ["cold, icy places", "the desert", "the jungle", "the savanna"]),
  h(7, "Which habitat is a grassy plain with lions?", "the savanna", ["the savanna", "the desert", "the ocean", "the tundra"]),
  h(7, "What is the place where a specific animal lives called?", "its habitat", ["its habitat", "its lunch", "its toy", "its family"]),
];

/* ================================================================
   MATTER (Adventure · d 4-7)
   ================================================================ */
const m = bank("matter", "matter");
const matterBank: BankEntry[] = [
  m(4, "Which one is a solid?", "a rock", ["a rock", "water", "air", "steam"]),
  m(4, "Which one is a liquid?", "milk", ["milk", "a rock", "air", "ice"]),
  m(4, "Which one is a gas?", "air", ["air", "a rock", "milk", "juice"]),
  m(4, "Which one can you hold in your hand?", "a ball", ["a ball", "water", "air", "steam"]),
  m(4, "Which one flows and takes the shape of its cup?", "water", ["water", "a rock", "ice", "a ball"]),
  m(4, "What happens to water when you freeze it?", "it turns to ice", ["it turns to ice", "it turns to steam", "it disappears", "it gets hot"]),
  m(5, "What happens to ice when you warm it up?", "it melts into water", ["it melts into water", "it turns to rock", "it floats away", "it gets bigger"]),
  m(5, "Steam is water that has been ____.", "boiled", ["boiled", "frozen", "stirred", "spilled"]),
  m(5, "Which one is a gas we breathe out?", "carbon dioxide", ["carbon dioxide", "honey", "sand", "milk"]),
  m(5, "What do we call it when water changes into ice?", "freezing", ["freezing", "melting", "boiling", "mixing"]),
  m(5, "What do we call it when ice changes into water?", "melting", ["melting", "freezing", "evaporating", "dissolving"]),
  m(5, "What do we call it when water turns into steam?", "evaporation", ["evaporation", "freezing", "melting", "condensation"]),
  m(6, "Which one is a liquid at room temperature?", "juice", ["juice", "a spoon", "a rock", "ice"]),
  m(6, "Which one is a solid?", "a stone", ["a stone", "air", "juice", "steam"]),
  m(6, "A balloon is full of ____.", "air", ["air", "rock", "juice", "sand"]),
  m(6, "Melted chocolate is a ____.", "liquid", ["liquid", "solid", "gas", "rock"]),
  m(6, "Clouds are made of tiny drops of ____.", "water", ["water", "sand", "smoke", "dust"]),
  m(7, "Which of these takes the shape of its container?", "juice", ["juice", "a brick", "a spoon", "a pebble"]),
  m(7, "What is water vapor?", "water as a gas", ["water as a gas", "water as ice", "dirty water", "sugary water"]),
  m(7, "Which one has no fixed shape and spreads out?", "a gas", ["a gas", "a solid", "ice", "a stone"]),
];

/* ================================================================
   WEATHER (Adventure · d 4-7)
   ================================================================ */
const w = bank("weather", "weather");
const weatherBank: BankEntry[] = [
  w(4, "What do you use when it rains?", "an umbrella", ["an umbrella", "a fan", "sunglasses", "a hat"]),
  w(4, "The season when snow often falls is ____.", "winter", ["winter", "summer", "spring", "fall"]),
  w(4, "Which season is the hottest?", "summer", ["summer", "winter", "spring", "fall"]),
  w(4, "The season when flowers bloom is ____.", "spring", ["spring", "winter", "summer", "fall"]),
  w(4, "The season when leaves fall is ____.", "autumn", ["autumn", "winter", "spring", "summer"]),
  w(4, "When water drops fall from the sky, it is ____.", "raining", ["raining", "snowing", "sunny", "windy"]),
  w(4, "The sun is out and it is warm. The weather is ____.", "sunny", ["sunny", "stormy", "snowy", "foggy"]),
  w(5, "The wind is blowing very strongly. It is ____.", "windy", ["windy", "sunny", "calm", "rainy"]),
  w(5, "Snowflakes are made of ____.", "ice crystals", ["ice crystals", "sand", "leaves", "water drops"]),
  w(5, "What does a thermometer measure?", "temperature", ["temperature", "wind", "rain", "clouds"]),
  w(5, "What is a rainbow made of?", "sunlight and rain", ["sunlight and rain", "paint", "flowers", "prisms"]),
  w(5, "What do we call very cold, snowy weather with strong wind?", "a blizzard", ["a blizzard", "a heat wave", "a drizzle", "a breeze"]),
  w(5, "Which weather word means it is very hot?", "a heat wave", ["a heat wave", "a blizzard", "a frost", "a shower"]),
  w(6, "What do we call a huge, swirling storm over the ocean?", "a hurricane", ["a hurricane", "a tornado", "a blizzard", "a rainbow"]),
  w(6, "What do we call a fast-spinning funnel of wind?", "a tornado", ["a tornado", "a hurricane", "a tsunami", "a monsoon"]),
  w(6, "Hail is made of ____.", "ice", ["ice", "sand", "snow", "rain"]),
  w(6, "What is thunder?", "the sound lightning makes", ["the sound lightning makes", "clouds bumping", "the wind", "rain falling"]),
  w(7, "Which season comes right after winter?", "spring", ["spring", "summer", "autumn", "winter"]),
  w(7, "Which season comes right before winter?", "autumn", ["autumn", "summer", "spring", "winter"]),
  w(7, "Which kind of cloud usually brings rain?", "a storm cloud", ["a storm cloud", "a thin cloud", "a high cloud", "a wispy cloud"]),
];

/* ================================================================
   PLANTS (Adventure · d 4-7)
   ================================================================ */
const p = bank("plants", "plants");
const plantsBank: BankEntry[] = [
  p(4, "Which part of the plant is in the soil?", "the roots", ["the roots", "the leaves", "the flower", "the petals"]),
  p(4, "Which part of the plant makes the food?", "the leaves", ["the leaves", "the roots", "the seeds", "the stem"]),
  p(4, "Which part holds the plant up?", "the stem", ["the stem", "the roots", "the leaves", "the seeds"]),
  p(4, "Which part of a plant becomes a new plant?", "the seed", ["the seed", "the leaf", "the stem", "the root"]),
  p(4, "What do plants need to grow?", "water and sunlight", ["water and sunlight", "juice and candy", "soda and chips", "only darkness"]),
  p(4, "Where do most plants get their energy?", "the Sun", ["the Sun", "the rain", "the soil", "the wind"]),
  p(5, "What do plants give off that we breathe?", "oxygen", ["oxygen", "carbon dioxide", "smoke", "helium"]),
  p(5, "What do plants take in from the air?", "carbon dioxide", ["carbon dioxide", "oxygen", "helium", "smoke"]),
  p(5, "Which plant part is a carrot?", "a root", ["a root", "a leaf", "a seed", "a flower"]),
  p(5, "Which plant part do we eat when we eat lettuce?", "a leaf", ["a leaf", "a root", "a seed", "a stem"]),
  p(5, "Which plant part do we eat when we eat an apple?", "a fruit", ["a fruit", "a root", "a leaf", "a seed"]),
  p(5, "Which of these grows on a tree?", "an apple", ["an apple", "a carrot", "a potato", "a lettuce leaf"]),
  p(6, "Which part of a flower makes pollen?", "the stamen", ["the stamen", "the petal", "the stem", "the leaf"]),
  p(6, "What do bees help plants do?", "pollinate flowers", ["pollinate flowers", "plant seeds", "water roots", "grow leaves"]),
  p(6, "Which plant can grow in a pond?", "the water lily", ["the water lily", "the cactus", "the sunflower", "the pine tree"]),
  p(6, "What does a seed need to start growing?", "soil, water and sun", ["soil, water and sun", "sand, wind and dark", "ice, rain and cold", "only water"]),
  p(7, "Which part of a tree is its stem?", "the trunk", ["the trunk", "the root", "the leaf", "the bud"]),
  p(7, "Which tree keeps its leaves all year?", "an evergreen", ["an evergreen", "a maple", "an oak", "a birch"]),
  p(7, "What do plants use sunlight to make?", "food", ["food", "water", "soil", "shade"]),
  p(7, "Which of these is a seed we eat?", "a sunflower seed", ["a sunflower seed", "a leaf", "a petal", "a root"]),
];

/* ================================================================
   BODY (Adventure · d 4-7)
   ================================================================ */
const b = bank("body", "body");
const bodyBank: BankEntry[] = [
  b(4, "Which part do you use to see?", "your eyes", ["your eyes", "your ears", "your nose", "your mouth"]),
  b(4, "Which part do you use to hear?", "your ears", ["your ears", "your eyes", "your nose", "your toes"]),
  b(4, "Which part do you use to smell?", "your nose", ["your nose", "your eyes", "your ears", "your knees"]),
  b(4, "Which part do you use to taste?", "your tongue", ["your tongue", "your nose", "your ears", "your elbow"]),
  b(4, "Which part do you use to touch and feel?", "your skin", ["your skin", "your teeth", "your hair", "your nails"]),
  b(4, "How many fingers are on one hand?", "5", ["5", "4", "6", "10"]),
  b(4, "How many toes are on one foot?", "5", ["5", "4", "6", "10"]),
  b(4, "What do you use to walk and run?", "your legs", ["your legs", "your arms", "your head", "your back"]),
  b(5, "Which organ pumps blood all over your body?", "your heart", ["your heart", "your lungs", "your brain", "your stomach"]),
  b(5, "Which organs do you use to breathe?", "your lungs", ["your lungs", "your heart", "your liver", "your eyes"]),
  b(5, "Which organ helps you think and learn?", "your brain", ["your brain", "your heart", "your stomach", "your skin"]),
  b(5, "Which organ helps break down your food?", "your stomach", ["your stomach", "your heart", "your brain", "your lungs"]),
  b(5, "Which sense uses your eyes?", "sight", ["sight", "hearing", "smell", "touch"]),
  b(5, "Which sense uses your ears?", "hearing", ["hearing", "sight", "taste", "smell"]),
  b(5, "Which sense uses your nose?", "smell", ["smell", "sight", "hearing", "touch"]),
  b(6, "Which bones protect your brain?", "your skull", ["your skull", "your ribs", "your spine", "your hips"]),
  b(6, "Which bones protect your heart and lungs?", "your ribs", ["your ribs", "your skull", "your toes", "your fingers"]),
  b(6, "Which sense uses your tongue?", "taste", ["taste", "sight", "hearing", "smell"]),
  b(6, "Which sense uses your skin?", "touch", ["touch", "taste", "smell", "hearing"]),
  b(6, "What is the biggest bone in your body?", "your thigh bone", ["your thigh bone", "your arm bone", "your rib", "your finger bone"]),
  b(7, "How many bones does a grown-up body have?", "about 206", ["about 206", "about 100", "about 50", "about 500"]),
  b(7, "What are the five senses?", "sight, hearing, smell, taste, touch", ["sight, hearing, smell, taste, touch", "see, run, jump, play, read", "eyes, ears, nose, mouth, hair", "happy, sad, mad, silly, scared"]),
  b(7, "What connects your muscles to your bones?", "tendons", ["tendons", "nerves", "veins", "hairs"]),
  b(7, "What covers and protects the outside of your body?", "your skin", ["your skin", "your bones", "your muscles", "your nails"]),
];

/* ================================================================
   SPACE (Champion · d 7-10)
   ================================================================ */
const s = bank("space", "space");
const spaceBank: BankEntry[] = [
  s(7, "Which planet is closest to the Sun?", "Mercury", ["Mercury", "Venus", "Earth", "Mars"]),
  s(7, "Which planet is the biggest?", "Jupiter", ["Jupiter", "Saturn", "Earth", "Neptune"]),
  s(7, "Which planet is famous for its rings?", "Saturn", ["Saturn", "Jupiter", "Mars", "Venus"]),
  s(7, "Which planet is called the Red Planet?", "Mars", ["Mars", "Venus", "Jupiter", "Mercury"]),
  s(7, "How many planets are in our solar system?", "8", ["8", "7", "9", "10"]),
  s(7, "What is the Sun?", "a star", ["a star", "a planet", "a moon", "a comet"]),
  s(8, "What is the Moon?", "Earth's natural satellite", ["Earth's natural satellite", "a star", "a planet", "a rocket"]),
  s(8, "What keeps the planets orbiting the Sun?", "gravity", ["gravity", "the wind", "magnets", "engines"]),
  s(8, "Which planet is the hottest?", "Venus", ["Venus", "Mercury", "Earth", "Mars"]),
  s(8, "Which planet is known as the blue planet with lots of water?", "Earth", ["Earth", "Neptune", "Uranus", "Venus"]),
  s(8, "Which is the smallest planet?", "Mercury", ["Mercury", "Mars", "Venus", "Earth"]),
  s(8, "What is a shooting star really?", "a meteor", ["a meteor", "a comet", "an asteroid", "a planet"]),
  s(8, "What causes day and night on Earth?", "Earth spinning", ["Earth spinning", "the Moon moving", "the Sun moving", "clouds passing"]),
  s(9, "How long does Earth take to orbit the Sun?", "one year", ["one year", "one day", "one month", "one hour"]),
  s(9, "How long does Earth take to spin around once?", "one day", ["one day", "one year", "one week", "one month"]),
  s(9, "What is the Milky Way?", "our galaxy", ["our galaxy", "a planet", "a moon", "a spaceship"]),
  s(9, "Which planet spins on its side?", "Uranus", ["Uranus", "Neptune", "Jupiter", "Saturn"]),
  s(9, "What is a comet mostly made of?", "ice and dust", ["ice and dust", "fire and smoke", "rock and gold", "water and sand"]),
  s(10, "Which moon phase is completely bright and round?", "the full moon", ["the full moon", "the new moon", "the crescent", "the half moon"]),
  s(10, "Which planet is sometimes called the 'morning star'?", "Venus", ["Venus", "Mars", "Jupiter", "Mercury"]),
  s(10, "What do astronauts wear to stay safe in space?", "a spacesuit", ["a spacesuit", "a raincoat", "a wetsuit", "a jacket"]),
  s(10, "Which vehicle flies astronauts into space?", "a rocket", ["a rocket", "a plane", "a helicopter", "a submarine"]),
];

/* ================================================================
   MACHINES (Champion · d 7-10)
   ================================================================ */
const me = bank("machines", "machines");
const machinesBank: BankEntry[] = [
  me(7, "Which simple machine is a ramp?", "an inclined plane", ["an inclined plane", "a lever", "a pulley", "a wedge"]),
  me(7, "Which simple machine has a wheel with a rope?", "a pulley", ["a pulley", "a lever", "a screw", "a wedge"]),
  me(7, "Which simple machine is a bar that turns on a point?", "a lever", ["a lever", "a pulley", "a screw", "a wedge"]),
  me(7, "Which simple machine is a wheel with a rod through the middle?", "a wheel and axle", ["a wheel and axle", "a pulley", "a lever", "a wedge"]),
  me(7, "A seesaw is a kind of ____.", "lever", ["lever", "pulley", "screw", "wedge"]),
  me(7, "A doorknob is a ____.", "wheel and axle", ["wheel and axle", "lever", "pulley", "wedge"]),
  me(8, "Which simple machine helps split things apart?", "a wedge", ["a wedge", "a lever", "a pulley", "a screw"]),
  me(8, "Which simple machine is a pointy spiral that holds things?", "a screw", ["a screw", "a wedge", "a pulley", "a lever"]),
  me(8, "A flagpole uses a ____ to raise the flag.", "pulley", ["pulley", "wedge", "lever", "screw"]),
  me(8, "A playground slide is an ____.", "inclined plane", ["inclined plane", "wedge", "pulley", "screw"]),
  me(8, "Scissors use two ____ to cut.", "wedges", ["wedges", "pulleys", "levers", "screws"]),
  me(8, "A staircase is a set of ____.", "inclined planes", ["inclined planes", "wedges", "pulleys", "screws"]),
  me(9, "A jar lid uses ____ threads to close tight.", "screw", ["screw", "wedge", "lever", "pulley"]),
  me(9, "Which simple machine would help you lift a heavy flag?", "a pulley", ["a pulley", "a screw", "a wedge", "a lever"]),
  me(9, "A ramp makes work easier by spreading it over a ____.", "longer distance", ["longer distance", "shorter time", "bigger load", "smaller space"]),
  me(9, "A car's steering wheel is a ____.", "wheel and axle", ["wheel and axle", "pulley", "wedge", "screw"]),
  me(9, "An axe blade is a ____.", "wedge", ["wedge", "pulley", "screw", "lever"]),
  me(10, "A nail is a kind of ____ that splits wood.", "wedge", ["wedge", "screw", "lever", "pulley"]),
  me(10, "A wheelbarrow uses a ____ to make lifting easy.", "lever", ["lever", "pulley", "screw", "wedge"]),
  me(10, "Which simple machine do you find on a bicycle's pedals?", "a wheel and axle", ["a wheel and axle", "a wedge", "a pulley", "a screw"]),
  me(10, "A windmill's spinning blades are part of a ____.", "wheel and axle", ["wheel and axle", "pulley", "screw", "wedge"]),
  me(10, "What do all simple machines do?", "make work easier", ["make work easier", "make things heavier", "use electricity", "stop motion"]),
];

/* ================================================================
   ECOSYSTEMS (Champion · d 7-10)
   ================================================================ */
const ec = bank("ecosystems", "ecosystems");
const ecosystemsBank: BankEntry[] = [
  ec(7, "In a food chain, a plant is a ____.", "producer", ["producer", "consumer", "decomposer", "predator"]),
  ec(7, "Which animal is a herbivore?", "a cow", ["a cow", "a lion", "a shark", "an eagle"]),
  ec(7, "Which animal is a carnivore?", "a lion", ["a lion", "a cow", "a rabbit", "a horse"]),
  ec(7, "Which animal eats both plants and animals?", "an omnivore", ["an omnivore", "a herbivore", "a carnivore", "a producer"]),
  ec(7, "A lion is at the top of the ____.", "food chain", ["food chain", "food pyramid", "food store", "food chart"]),
  ec(8, "Grass → rabbit → fox. Who eats the rabbit?", "the fox", ["the fox", "the grass", "the sun", "the soil"]),
  ec(8, "Which animal is a decomposer?", "a worm", ["a worm", "a lion", "a deer", "a hawk"]),
  ec(8, "What do decomposers do?", "break down dead things", ["break down dead things", "make their own food", "hunt big animals", "build nests"]),
  ec(8, "Which animal is a predator?", "a hawk", ["a hawk", "a rabbit", "a mouse", "a grasshopper"]),
  ec(8, "Which animal is prey for a fox?", "a rabbit", ["a rabbit", "a wolf", "an eagle", "a bear"]),
  ec(8, "Plants make their own food. They are ____.", "producers", ["producers", "consumers", "decomposers", "predators"]),
  ec(8, "Animals that only eat plants are ____.", "herbivores", ["herbivores", "carnivores", "omnivores", "decomposers"]),
  ec(9, "Where does the energy in a food chain begin?", "the Sun", ["the Sun", "the soil", "the plants", "the animals"]),
  ec(9, "Which of these is a correct food chain?", "grass → rabbit → fox", ["grass → rabbit → fox", "fox → rabbit → grass", "rabbit → fox → grass", "grass → fox → rabbit"]),
  ec(9, "Which animal is a scavenger that cleans up?", "a vulture", ["a vulture", "a deer", "a butterfly", "a chipmunk"]),
  ec(9, "Which is a consumer that eats producers?", "a herbivore", ["a herbivore", "a plant", "a mushroom", "the Sun"]),
  ec(9, "What would happen if all plants disappeared?", "most animals would starve", ["most animals would starve", "animals would eat more meat", "nothing would change", "lions would eat grass"]),
  ec(10, "An ecosystem includes ____.", "living and non-living things", ["living and non-living things", "only animals", "only plants", "only the weather"]),
  ec(10, "A caterpillar eats leaves. A bird eats the caterpillar. The bird's prey is ____.", "the caterpillar", ["the caterpillar", "the leaves", "the Sun", "the tree"]),
  ec(10, "Which animal is a herbivore in a pond?", "a tadpole", ["a tadpole", "a pike", "a heron", "an otter"]),
];

/* ================================================================
   FORCES (Champion · d 7-10)
   ================================================================ */
const fo = bank("forces", "forces");
const forcesBank: BankEntry[] = [
  fo(7, "Which force pulls things down to Earth?", "gravity", ["gravity", "friction", "magnetism", "thrust"]),
  fo(7, "Which force slows a sliding toy down?", "friction", ["friction", "gravity", "magnetism", "electricity"]),
  fo(7, "Which force makes a paperclip stick to a magnet?", "magnetism", ["magnetism", "gravity", "friction", "sound"]),
  fo(7, "Pushing and pulling are examples of ____.", "forces", ["forces", "machines", "materials", "motions"]),
  fo(7, "What makes a ball roll downhill?", "gravity", ["gravity", "friction", "the wind", "magnets"]),
  fo(8, "Which material do magnets attract?", "iron", ["iron", "wood", "plastic", "paper"]),
  fo(8, "Two magnets pushing apart are ____.", "repelling", ["repelling", "attracting", "melting", "sticking"]),
  fo(8, "Two magnets sticking together are ____.", "attracting", ["attracting", "repelling", "spinning", "floating"]),
  fo(8, "When you brake a bike, which force slows it down?", "friction", ["friction", "gravity", "magnetism", "air"]),
  fo(8, "Which surface makes a toy car go fastest?", "smooth ice", ["smooth ice", "thick sand", "rough carpet", "grass"]),
  fo(8, "Which one is a push?", "closing a door", ["closing a door", "opening a drawer", "picking up a toy", "lifting a bag"]),
  fo(9, "Which one is a pull?", "opening a drawer", ["opening a drawer", "pushing a swing", "kicking a ball", "throwing a ball"]),
  fo(9, "What does friction do to moving things?", "slows them down", ["slows them down", "speeds them up", "lifts them up", "melts them"]),
  fo(9, "Magnets have two poles called ____.", "north and south", ["north and south", "top and bottom", "red and blue", "plus and minus"]),
  fo(9, "Which tool uses magnetism to show direction?", "a compass", ["a compass", "a ruler", "a clock", "a scale"]),
  fo(9, "A rocket blasting off uses a strong ____.", "thrust", ["thrust", "friction", "pull", "bounce"]),
  fo(10, "Why does a basketball bounce back up?", "the ground pushes it", ["the ground pushes it", "gravity pulls it up", "the air is heavy", "it has a motor"]),
  fo(10, "Rubbing your hands together makes heat because of ____.", "friction", ["friction", "gravity", "magnetism", "air"]),
  fo(10, "Which is NOT a force?", "a color", ["a color", "a push", "a pull", "friction"]),
  fo(10, "The stronger the push, the ____ an object moves.", "faster", ["faster", "slower", "smoother", "heavier"]),
];

/* ================================================================
   Registry
   ================================================================ */
export const SCIENCE_BANKS: TopicBank[] = [
  { topic: "animals", subject: "science", entries: animalsBank },
  { topic: "colors", subject: "science", entries: colorsBank },
  { topic: "food", subject: "science", entries: foodBank },
  { topic: "habitats", subject: "science", entries: habitatsBank },
  { topic: "matter", subject: "science", entries: matterBank },
  { topic: "weather", subject: "science", entries: weatherBank },
  { topic: "plants", subject: "science", entries: plantsBank },
  { topic: "body", subject: "science", entries: bodyBank },
  { topic: "space", subject: "science", entries: spaceBank },
  { topic: "machines", subject: "science", entries: machinesBank },
  { topic: "ecosystems", subject: "science", entries: ecosystemsBank },
  { topic: "forces", subject: "science", entries: forcesBank },
];
