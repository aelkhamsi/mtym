import CtaSection from "@/app/components/cta/cta-section"
import ConferencesSection from "./conferences-section"
import SectionContainer from "@/app/components/section-container"
import { Separator } from "@mdm/ui"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@mdm/ui"

const images = [
  {
    name: 'MathSprint contest',
    src: '/past-edition/mdm_1.webp' 
  },
  {
    name: 'MathSprint contest',
    src: '/past-edition/mdm_2.webp'
  },
]

const ConferenceCard1 = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-4 justify-between">
      <div className="w-full md:w-1/6">
        <img src='images/conferences/lhoussaine_tenghiri.webp' />
      </div>

      <div className="w-full md:w-5/6 ml-4">
        <div className='text-3xl font-semibold'>Lhoussaine Tenghiri</div>
        <div className="text-gray-500">Assistant Professor - Al Akhawayn University</div>
        <div className="mt-2">
          <div className="text-2xl font-medium text-[#244B3A]"><span className="font-light">Title</span>: Mathematics as the Language of Physics.</div>

          <AlertDialog>
            <AlertDialogTrigger className="border rounded-md p-2 mt-2">
              See Abstract
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogTitle className="text-lg">Mathematics as the Language of Physics</AlertDialogTitle>
              <p>Classical mechanics is one of the first frameworks used to understand motion and interaction, with mathematics at its core. This presentation highlights the role of mathematics in physical analysis through kinematics, dynamics, and energy methods. Using simple examples of motion, forces, and energy conservation, students will see how equations, graphs, and mathematical relationships turn physical observations into predictive models. The talk emphasizes mathematics as a key tool for describing motion, explaining physical change, and supporting further learning in physics and engineering.</p>
              <AlertDialogFooter> <AlertDialogCancel>Fermer</AlertDialogCancel> </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
        </div>
      </div>      
    </div>
  )
}


const ConferenceCard2 = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-4 justify-between">
      <div className="w-full md:w-1/6">
        <img src='images/conferences/mohammed_bounouar.webp' />
      </div>

      <div className="w-full md:w-5/6 ml-4">
        <div className='text-3xl font-semibold'>⁠Mohamed Bounouar</div>
        <div className="text-gray-500">Head AI Transformation Unlock Program - OCP SPS</div>
        <div className="mt-2">
          <span className="text-2xl font-medium text-[#244B3A]">Opening Ceremony Keynote Speaker.</span>
        </div>
      </div>
    </div>
  )
}

const ConferenceCard3 = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-4 justify-between">
      <div className="w-full md:w-1/6">
        <img src='images/conferences/yassir_jedra.webp' />
      </div>

      <div className="w-full md:w-5/6 ml-4">
        <div className='text-3xl font-semibold'>Yassir Jedra</div>
        <div className="text-gray-500">Assistant Professor - Imperial College London</div>
        <div className="mt-2">
          <div className="text-2xl font-medium text-[#244B3A]"><span className="font-light">Title</span>: Some of The Mathematics Behind Reinforcement Learning.</div>

          <AlertDialog>
            <AlertDialogTrigger className="border rounded-md p-2 mt-2">
              See Abstract
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogTitle className="text-lg">Some of The Mathematics Behind Reinforcement Learning</AlertDialogTitle>
              <p>This presentation explores Reinforcement Learning (RL), a paradigm in machine learning that has driven many of the recent breakthroughs in AI. RL has enabled remarkable achievements, including mastering complex strategy games like Go with AlphaGo, generating human-like language with systems such as ChatGPT, and learning to control robots and physical systems.</p>
              <p>The discussion highlights these successes and examines the types of problems where RL excels. Since the RL paradigm relies heavily on mathematics, key mathematical concepts underlying RL solutions are emphasized. Using AlphaGo as a case study, the presentation traces the evolution of mathematical ideas into a superhuman intelligence capable of defeating top human players at Go. Along the way, it explores the exploration-exploitation dilemma central to RL problems and demonstrates how foundational “toy” problems, such as multi-armed bandits, helped shape strategies to address this challenge.</p>
              <AlertDialogFooter> <AlertDialogCancel>Fermer</AlertDialogCancel> </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>          
        </div>
      </div>
    </div>
  )
}

const ConferenceCard4 = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-4 justify-between">
      <div className="w-full md:w-1/6">
        <img src='images/conferences/youssef_hbid.webp' />
      </div>

      <div className="w-full md:w-5/6 ml-4">
        <div className='text-3xl font-semibold'>Youssef Hbid</div>
        <div className="text-gray-500">Research Associate - Imperial College London</div>
        <div className="mt-2">
          <div className="text-2xl font-medium text-[#244B3A]"><span className="font-light">Title</span>: From Equations to Impact: Mathematics in Modern Healthcare.</div>

          <AlertDialog>
            <AlertDialogTrigger className="border rounded-md p-2 mt-2">
              See Abstract
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogTitle className="text-lg">From Equations to Impact: Mathematics in Modern Healthcare</AlertDialogTitle>
              <p>Mathematics is often perceived as an abstract academic discipline, far removed from real-world concerns. In reality, it lies at the heart of many advances in modern healthcare, providing rigorous tools to understand, predict, and respond to complex medical challenges.</p>
              <p>This closing conference offers an accessible perspective on how research in applied mathematics contributes to epidemiology, predictive medicine, and data-driven health research. Through illustrative examples, it highlights how mathematical models help analyze the spread of diseases, anticipate their evolution, and support the identification of new therapeutic opportunities through drug repurposing. The role of machine learning in extracting meaningful insight from medical data is also discussed, alongside emerging approaches such as federated learning, which enable collaborative research while preserving data privacy.</p>
              <p>Beyond specific methods and applications, this talk emphasizes the broader role of mathematical research as a bridge between abstract ideas and societal impact. It aims to inspire young scientists by showing that mathematical research is not only intellectually rigorous, but also a powerful way to contribute to public health and the future of medicine.</p>
              <AlertDialogFooter> <AlertDialogCancel>Fermer</AlertDialogCancel> </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>          
        </div>
      </div>
    </div>
  )
}


export default function ConferencesPage() {
  return (
    <SectionContainer className="pt-24 pb-20 z-0">
      <div className="space-y-8">
        <h1 className="text-center text-3xl font-bold font-neco drop-shadow-sm text-[#244B3A]">
          Conferences
        </h1>

        <div
          className="animate-fade-up bg-clip-text text-center font-display opacity-0 space-y-4"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <p>Plongez-vous dans l'univers des mathématiques grâce à une série de conférences captivantes données par des experts renommés dans ce domaine.</p>
          <p>Ces conférences vous offriront de nouvelles perspectives, des discussions approfondies et des aperçus sur un large éventail de sujets mathématiques, allant des théories classiques aux dernières avancées.</p>
        </div>
      </div>

      <div className="flex flex-col md:items-center">
        <div className="md:w-[80%]">
          <Separator className="my-6"/>
          <ConferenceCard2 />

          <Separator className="my-6"/>
          <ConferenceCard1 />

          <Separator className="my-6"/>
          <ConferenceCard3 />
          
          <Separator className="my-6"/>
          <ConferenceCard4 />
        </div>
      </div>
      


    </SectionContainer>
  )
}