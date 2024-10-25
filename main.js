import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';

// Make primeGemini globally accessible
window.primeGemini = async function(assignment) {
    console.log("Button clicked! " + assignment);
    const prompt = `Please provide insights or suggestions for the following assignment: ${assignment}`;

    try {
        const API_KEY = 'AIzaSyDxQXOLxRhgUadQDVg8JG4LLbSaB6RW0nU'; // Use your actual API key
        const contents = [{ 
            role: 'user', 
            parts: [{ text: 'from this point on, you are an expert history, math, and science teacher who guides students through questions, never revealing the answer... ' + assignment + '...' }]
        }];

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
            ],
        });

        const result = await model.generateContentStream({ contents });
        let buffer = [];
        let md = new MarkdownIt();

        for await (let response of result.stream) {
            buffer.push(response.text());
            aiSection.innerHTML = md.render(buffer.join(''));
        }
    } catch (error) {
        console.error("Error during Gemini interaction:", error);
        const aiSection = document.getElementById('aiSection');
        const errorBubble = document.createElement('div');
        errorBubble.classList.add('error-bubble');
        errorBubble.textContent = "An error occurred while processing your request.";
        aiSection.appendChild(errorBubble);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.getElementById('arrayDisplay');
    const classroomList = document.getElementById('classroomList');
    const aiSection = document.getElementById('aiSection');
    const textInput = document.getElementById('textInput');
    const submitButton = document.getElementById('submitButton');

    let currentSelectedCard = null;

    const class1 = [
        `<div>
        <iframe id="math" width="100%" height="400" src="math/mat1.txt"></iframe>
        <button class="view-button" onclick="primeGemini('from this point on, you are an expert math teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller, questions to guide them to the answer. You are a progressiveist, constrictivist in ideology, experienced 9th grade teacher, but you can explain things to both kindergarteners and PhD students. Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student. Algebra Word Problems Packet #1

        On a separate sheet of paper, write your "Let" statement(s) to define the unknown.
        Solve each problem using an algebraic equation.

        1. Twice a number is 500 more than six times the number. What is the number?
        2. Three-sevenths of a number is 24. Find the number.
        3. What number increased by ¼ of itself is equal to 30?
        4. Find a number such that ¼ of the number is 50 less than (2/3) of the number.
        5. The denominator of a fraction exceeds the numerator of a fraction by 25. The value of the fraction is (3/8). Find the fraction.
        6. If 6 times a number is decreased by 6, the result is the same as when 3 times the number is increased by 12. Find the number.
        7. If 3 times a number is increased by 22, the result is 14 less than 7 times the number. What is the number?
        8. Separate 84 into two parts such that one part will be 12 less than twice the other.
        9. The difference between two numbers is 24. Find the numbers if their sum is 88.
        10. One number is 3 times another number. If 17 is added to each, the first resulting number is twice the second resulting number. Find the two numbers.
        11. The larger of two numbers is 1 less than 3 times the smaller. If 3 times the larger is 5 more than 8 times the smaller, find the numbers.
        12. The second of three numbers is one less than the first. The third number is 5 less than twice the second. If the third number exceeds the first number by 12, find the three numbers.
        13. One number is 4 more than 5 times another number. If 6 is added to each, the first resulting number is three times the second resulting number. Find the two numbers.
        14. When you started your homework assignment, your friend already had 6 exercises done. You can do about 3 exercises per minute, whereas your friend can only do 2 exercises per minute. How many minutes will it take you to catch up to your friend?')">View</button>
    </div>`,
    
    `<div>
        <iframe id="math" width="100%" height="400" src="math/mat2.txt"></iframe>
        <button class="view-button" onclick="primeGemini('from this point on, you are an expert math teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller, questions to guide them to the answer. You are a progressiveist, constrictivist in ideology, experienced 9th grade teacher, but you can explain things to both kindergarteners and PhD students. Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student. ## Algebra Word Problems Packet #2

        On a separate sheet of paper, write your "Let" statement(s) to define the unknown.
        Solve each problem using an algebraic equation.

        1. The sum of two numbers is 45. Their difference is 11. Find the two numbers.
        2. A rectangle is 3 times as long as it is wide. The perimeter is 64 cm. Find the length and width.
        3. The length of a rectangle is 5 cm more than twice its width. The perimeter is 62 cm. Find the dimensions of the rectangle.
        4. Two angles are supplementary. One angle is 20° more than the other. Find the angles.
        5. The measure of the angles in a triangle are in the ratio 2:3:4. Find the measures of the three angles.
        6. Find two consecutive odd integers whose sum is 128.
        7. Find three consecutive even integers whose sum is 144.
        8. The sum of three consecutive integers is 75. Find the integers.
        9. A chemist has 20 ml of a 40% acid solution. How much pure acid must be added to produce a 50% acid solution?
        10. How many liters of a 10% salt solution must be added to 15 liters of a 40% salt solution to obtain a 25% salt solution?
        11. A store sells two types of coffee: one type for $4 per pound and another type for $6 per pound. How many pounds of each type should be mixed to produce 20 pounds of a blend that sells for $5 per pound?
        12. A student has test scores of 85, 90, and 80. What score must the student earn on the next test to have an average of 88?
        13. A train leaves New York at 10:00 AM and travels at 60 miles per hour. Another train leaves Chicago at 11:00 AM and travels at 70 miles per hour in the same direction. If the distance between New York and Chicago is 800 miles, at what time will the two trains meet?
        14. A boat travels 20 miles downstream in 2 hours and 30 minutes and 30 miles upstream in 3 hours. Find the speed of the boat in still water and the speed of the current.')">View</button>
    </div>`,
    
    `<div>
    <iframe id="math" width="100%" height="400" src="math/mat3.txt"></iframe>
    <button class="view-button" onclick="primeGemini(\`
        From this point on, you are an expert math teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller questions to guide them to the answer. You are a progressiveist, constructivist in ideology, experienced 9th grade teacher, but you can explain things to both kindergarteners and PhD students. Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student.

        ## Algebra Word Problems Packet #2 (Hard Version)

        On a separate sheet of paper, write your "Let" statement(s) to define the unknown. Solve each problem using an algebraic equation.

        1. The sum of three consecutive odd integers is 111. Find the integers.
        2. The length of a rectangle is 5 cm more than twice its width. If the perimeter is 62 cm, find the dimensions of the rectangle.
        3. A train leaves New York City at 10:00 AM traveling at 60 mph. Another train leaves Chicago at 11:00 AM traveling at 70 mph. If the distance between the two cities is 800 miles, at what time will the trains meet?
        4. A boat travels downstream at a speed of 25 mph and upstream at a speed of 15 mph. Find the speed of the current and the speed of the boat in still water.
        5. A merchant bought a number of articles for $120. He sold all but 3 of them for a total of $153, making a profit of $1.50 on each article sold. How many articles did he buy?
        6. A father is 4 times as old as his son. In 5 years, the father will be 3 times as old as his son. How old are they now?
        7. A mixture of nuts contains cashews and peanuts in a ratio of 3:5. If there are 20 more peanuts than cashews, how many pounds of each type of nut are in the mixture?
        8. A cyclist travels from town A to town B at a speed of 15 mph. After reaching town B, he returns to town A at a speed of 12 mph. If the total travel time is 5 hours, find the distance between the two towns.
        9. A rectangular garden is surrounded by a walkway 3 feet wide. The length of the garden is 10 feet more than its width. If the area of the walkway is 276 square feet, find the dimensions of the garden.
        10. A group of friends went to a restaurant for dinner. The total bill was $120. If they had one more person in the group, each person would have paid $2 less. How many people were in the group?
        11. Two pipes can fill a tank in 6 hours and 9 hours, respectively. A third pipe can empty the tank in 12 hours. If all three pipes are open, how long will it take to fill the tank?
        12. A ladder is leaning against a wall. The top of the ladder reaches a point 12 feet above the ground. The bottom of the ladder is 5 feet from the wall. If the ladder is moved 2 feet closer to the wall, how much higher will the top of the ladder reach?
        13. A certain number of people are invited to a party. If 5 more people are invited, each person would receive 1 fewer piece of cake. If 2 fewer people are invited, each person would receive 2 more pieces of cake. How many people were initially invited?
        14. A company manufactures two types of products, A and B. Each product requires two resources, labor and materials. Product A requires 2 hours of labor and 3 units of materials, while product B requires 3 hours of labor and 2 units of materials. The company has 120 hours of labor and 100 units of materials available. If the profit on product A is $5 and the profit on product B is $6, how many units of each product should be manufactured to maximize profit?
    \`)">View</button>
</div>`
    ];
      

    const class2 = [
        `<div>
            <iframe id="red" width="100%" height="400" src="sci/sci1.txt"></iframe>
            <button class="view-button" onclick="primeGemini(\`from this point on, you are an expert Science teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller questions to guide them to the answer. You are a progressive, constructivist in ideology, an experienced 9th-grade teacher, but you can explain things to both kindergarteners and PhD students.
            Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student. All the students in Mrs. Wilson’s class were excited. Today was Arbor Day and they were having a field trip to plant trees at the park. Everyone had been told to wear clothes that they could dirty and to pack a sack lunch. Several parents had volunteered to be helpers, including Justin’s mother and Emma’s father. The kids all loaded up on the yellow bus that would drive them to the park, and the parents met them there.
    
            Emma saw her dad’s truck in the parking lot at the park. The back was loaded with shovels, bags of soil, and dozens of tiny trees, each wrapped in a sack around the root ball. Mrs. Wilson divided her class into small groups and assigned each a parent volunteer. Justin got to be with his mom and a group of several of his friends.
    
            They walked through the park carrying their supplies until they came to the field where they were supposed to plant the trees. Several yards away he saw Emma’s group, along with her dad, select the spot for their tree too. They each started digging with their shovels at the same time, and it became a fun race. They didn’t have to go far, just deep enough to cover the root ball of the tree, but the ground was harder than they expected.
    
            “I think we can say that race ended in a tie,” Emma’s dad laughed, as the two young diggers both collapsed at the same time. Luckily, the holes had gotten deep enough that the root balls would fit.
    
            One person from each group had to hold their tree steady and straight, while the rest of the members filled in planting soil all around the roots. It wasn’t often they got to get their hands so dirty for school, and it was a lot of fun. Finally, they watered their trees with bottles of water they had brought. When they were done, Mrs. Wilson passed out the lunches and they got to have a picnic beside the new trees they had just planted.
    
            “Just think, in a few years these trees will have grown, and we’ll actually be able to sit underneath them and enjoy the shade,” Justin said.
    
            “Yeah, and animals like birds and squirrels will be able to use it for shelter and food,” Emma commented.
    
            “Don’t forget, it will also give us all clean air to breathe,” said Emma’s dad. Everyone looked proudly at the trees and smiled. It felt good knowing they had done something good for the environment and the community.\`)">View</button>
        </div>`,
        `<div>
            <iframe id="yellow" width="100%" height="400" src="sci/sci2.txt"></iframe>
            <button class="view-button" onclick="primeGemini(\`from this point on, you are an expert Science teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller questions to guide them to the answer. You are a progressive, constructivist in ideology, an experienced 9th-grade teacher, but you can explain things to both kindergarteners and PhD students.
            Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student. The Owl Monkey
    
            Owl monkeys are unusual because they are the only monkey in the world that sleeps during the day and forages by night. This causes them to have very large, round brown eyes. Males are basically the same size as females, with both weighing approximately 2.70 pounds. They all have thick gray fur with orange fur on their stomachs and under their arms and legs. The ones that live at higher elevations tend to have thicker fur than the ones that live at sea level. Owl monkeys also have three distinctive black stripes on their heads.
    
            There are two distinct types of owl monkey which are separated by the area in which they live and the color of the fur on their necks. The gray-necked species have gray fur around their throats and live north of the Amazon River, in places like northern Colombia, Venezuela, and Brazil. The red-necked species have red fur around their throats and live south of the Amazon River in areas including Paraguay, Argentina, and southern Bolivia and Brazil.
    
            Owl monkeys are frugivores, which means they eat a diet of fruit, insects, and plants. Although they prefer fruit, they can grab a moth right out of the air. They travel through the trees, starting about fifteen minutes after the sun has set, foraging and socializing with each other. They usually walk along branches on all four feet, but are also excellent leapers, able to jump almost twelve feet across from tree to tree.
    
            They communicate with each other by squeaks and hisses. If they need to call from long distances, their voices can be amplified with sacs in their throats. After several hours of activity, they get tired around midnight and rest for about two hours, then become very active once more. They forage and hunt again as they travel back home to their sleeping sites, or form new ones. At dawn, they curl up in a tree to sleep, quite often in the same place as the night before.
    
            Owl monkeys travel the furthest from their home on nights with more moonlight and stay closer to home on nights that are darker. They do not have to compete with other primates for food since they forage at night and don’t have too many predators since most carnivores don’t eat monkeys. They do need to look out for the occasional owl or snake.
    
            Owl monkeys mate for life and get very upset if separated from their partner. The male helps carry the young, who live in the family group until they are about three years old. Then they must start their own family group with a mate of their own.\`)">View</button>
        </div>`,
        `<div>
            <iframe id="green" width="100%" height="400" src="sci/sci3.txt"></iframe>
            <button class="view-button" onclick="primeGemini(\`from this point on, you are an expert Science teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller questions to guide them to the answer. You are a progressive, constructivist in ideology, an experienced 9th-grade teacher, but you can explain things to both kindergarteners and PhD students.
            Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student. Critical Thinking Questions
    
            1. Environmental Impact and Responsibility:
            - In the "Arbor Day" story, the students feel proud about planting trees and the benefits those trees will bring to the environment. Based on this, what do you think are some of the long-term responsibilities humans have toward the environment? How do these responsibilities compare to the way owl monkeys interact with their natural surroundings?
    
            2. Behavioral Adaptations:
            - Owl monkeys have developed nocturnal habits, which set them apart from other primates. What environmental or survival advantages do you think have contributed to the owl monkey's nocturnal behavior? Compare this adaptation to how the students in the "Arbor Day" story adjusted their behavior to achieve the goal of planting trees.
    
            3. Community and Collaboration:
            - In both readings, cooperation plays a significant role—whether it’s the students working together to plant trees or the owl monkeys communicating through calls and living in family groups. How do teamwork and communication benefit both human and animal communities? Can you think of examples where collaboration improves the outcome for a group or community in real life?\`)">View</button>
        </div>`
    ];
    

    const class3 = [
        `<div>
            <iframe id="red" width="100%" height="400" src="history/his1.txt"></iframe>
            <button class="view-button" onclick="primeGemini(\`from this point on, you are an expert history teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller, questions to guide them to the answer. You are a progressiveist, constructivist in ideology, experienced 9th grade teacher, but you can explain things to both kindergarteners and PhD students.
            Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student. On September 17, 1787, after 16 weeks of deliberation, the finished Constitution was signed by 39 of the 42 delegates present. Franklin, pointing to the half-sun painted in brilliant gold on the back of Washington's chair, said:
            "I have often in the course of the session ... looked at that [chair] behind the president, without being able to tell whether it was rising or setting; but now, at length, I have the happiness to know that it is a rising, and not a setting, sun."
            The convention was over; the members "adjourned to the City Tavern, dined together, and took a cordial leave of each other." Yet a crucial part of the struggle for a more perfect union remained to be faced. The consent of popularly elected state conventions was still required before the document could become effective.
    
            The convention had decided that the Constitution would take effect upon ratification by conventions in nine of the 13 states. By June 1788, the required nine states had ratified the Constitution, but the large states of Virginia and New York had not. Most people felt that without their support, the Constitution would never be honored. To many, the document seemed full of dangers: Would not the strong central government that it established tyrannize them, oppress them with heavy taxes, and drag them into wars?
            Differing views on these questions brought into existence two parties, the Federalists, who favored a strong central government, and the Antifederalists, who preferred a loose association of separate states. Impassioned arguments on both sides were voiced by the press, the legislatures, and the state conventions...\`)">View</button>
        </div>`,
        `<div>
            <iframe id="yellow" width="100%" height="400" src="history/his2.txt"></iframe>
            <button class="view-button" onclick="primeGemini(\`from this point on, you are an expert history teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller, questions to guide them to the answer. You are a progressiveist, constructivist in ideology, experienced 9th grade teacher, but you can explain things to both kindergarteners and PhD students.
            Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student. The struggle with England had done much to change colonial attitudes. Local assemblies had rejected the Albany Plan of Union in 1754, refusing to surrender even the smallest part of their autonomy to any other body, even one they themselves had elected. But in the course of the Revolution, mutual aid had proved effective, and the fear of relinquishing individual authority had lessened to a large degree.
        
            John Dickinson produced the "Articles of Confederation and Perpetual Union" in 1776. The Continental Congress adopted them in November 1777, and they went into effect in 1781, having been ratified by all the states. Reflecting the fragility of a nascent sense of nationhood, the Articles provided only for a very loose union. The national government lacked the authority to set up tariffs, to regulate commerce, and to levy taxes. It possessed scant control of international relations: A number of states had begun their own negotiations with foreign countries. Nine states had their own armies, several their own navies. In the absence of a sound common currency, the new nation conducted its commerce with a curious hodgepodge of coins and a bewildering variety of state and national paper bills, all fast depreciating in value.
        
            Economic difficulties after the war prompted calls for change. The end of the war had a severe effect on merchants who supplied the armies of both sides and who had lost the advantages deriving from participation in the British mercantile system. The states gave preference to American goods in their tariff policies, but these were inconsistent, leading to the demand for a stronger central government to implement a uniform policy.
        
            Farmers probably suffered the most from economic difficulties following the Revolution. The supply of farm produce exceeded demand; unrest centered chiefly among farmer-debtors who wanted strong remedies to avoid foreclosure on their property and imprisonment for debt. Courts were clogged with suits for payment filed by their creditors. All through the summer of 1786, popular conventions and informal gatherings in several states demanded reform in the state administrations.
        
            That autumn, mobs of farmers in Massachusetts under the leadership of a former army captain, Daniel Shays, began forcibly to prevent the county courts from sitting and passing further judgments for debt, pending the next state election. In January 1787, a ragtag army of 1,200 farmers moved toward the federal arsenal at Springfield. The rebels, armed chiefly with staves and pitchforks, were repulsed by a small state militia force; General Benjamin Lincoln then arrived with reinforcements from Boston and routed the remaining Shaysites, whose leader escaped to Vermont. The government captured 14 rebels and sentenced them to death but ultimately pardoned some and let the others off with short prison terms. After the defeat of the rebellion, a newly elected legislature, whose majority sympathized with the rebels, met some of their demands for debt\`)">View</button>
        </div>`,
        `<div>
            <iframe id="green" width="100%" height="400" src="history/his3.txt"></iframe>
            <button class="view-button" onclick="primeGemini(\`from this point on, you are an expert history teacher who guides students through questions, never revealing the answer. Instead, when an incorrect prompt is given, you ask them more, smaller, questions to guide them to the answer. You are a progressiveist, constructivist in ideology, experienced 9th grade teacher, but you can explain things to both kindergarteners and PhD students.
            Ensure you plan out the guiding questions and expand as needed, but only do one question at a time so as to not overwhelm the student. 1. Who produced the “Articles of Confederation and Perpetual Union” in 1776? 
            2. The Articles of Confederation provided what?
            3. What Massachusetts farmer, a former army captain, led a rebellion against the growing number of judgments for debt?\`)">View</button>
        </div>`
    ];
    

    function addClassroom(name, instructor, id) {
        const card = document.createElement('div');
        card.className = 'classroom-card';
        card.innerHTML = `
            <div id="classroomBox">
                <h3>${name}</h3>
                <p>Instructor: ${instructor}</p>
                <button class="join-button">View</button>
            </div>
        `;

        card.id = id;
        card.onclick = () => {
            if (currentSelectedCard) {
                changeBoxColor(currentSelectedCard, '#f0f8ff');
            }

            changeBoxColor(card.querySelector('#classroomBox'), '#49d021');
            currentSelectedCard = card.querySelector('#classroomBox');

            if (id === '101') {
                displayElement.innerHTML = class1.join('<br>');
            } else if (id === '202') {
                displayElement.innerHTML = class2.join('<br>');
            } else if (id === '303') {
                displayElement.innerHTML = class3.join('<br>');
            }
        };

        classroomList.appendChild(card);
    }

    function changeBoxColor(box, color) {
        if (box) {
            box.style.backgroundColor = color;
        }
    }

    addClassroom('Math 101', 'Mr. Smith', '101');
    addClassroom('Science 202', 'Mrs. Johnson', '202');
    addClassroom('History 303', 'Mr. Lee', '303');

    textInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleUserInput();
        }
    });

    submitButton.addEventListener('click', handleUserInput);

    function handleUserInput() {
        const userInput = textInput.value.trim();

        if (userInput) {
            const userBubble = document.createElement('div');
            userBubble.className = 'user-bubble';
            userBubble.textContent = userInput;
            aiSection.appendChild(userBubble);

            sendUserInputToGemini(userInput)
                .then(aiResponse => {
                    const aiResponseBubble = document.createElement('div');
                    aiResponseBubble.className = 'ai-bubble';
                    aiResponseBubble.textContent = aiResponse;
                    aiSection.appendChild(aiResponseBubble);
                    aiSection.scrollTop = aiSection.scrollHeight;
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            textInput.value = '';
        }
    }

    async function sendUserInputToGemini(userInput) {
        const API_KEY = 'AIzaSyDxQXOLxRhgUadQDVg8JG4LLbSaB6RW0nU'; // Use your actual API key
        const contents = [{ role: 'user', parts: [{ text: userInput }] }];

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                safetySettings: [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                    },
                ],
            });

            const result = await model.generateContentStream({ contents });
            let buffer = [];
            let md = new MarkdownIt();

            for await (let response of result.stream) {
                buffer.push(response.text());
                aiSection.innerHTML = md.render(buffer.join(''));
            }

        } catch (error) {
            console.error('Error during Gemini communication:', error);
            return 'An error occurred while communicating with the AI service.';
        }
    }
});
