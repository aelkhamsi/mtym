import SectionContainer from "@/app/components/section-container"

export default function Workshops() {
  return (
    <SectionContainer className="pt-24 pb-20 z-0 mb-[25rem]">

      <div className="space-y-8">
        <h1 className="text-center text-3xl font-bold font-neco drop-shadow-sm text-[#244B3A]">
          Workshops
        </h1>

        <p
          className="animate-fade-up bg-clip-text text-center font-display opacity-0"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Vous trouverez dans cette page les liens vers les Google Colabs relatifs aux workshops de MTYM.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border rounded-xl flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-4">Workshop CS - Mandelbrot</h3>
            <a href="https://colab.research.google.com/drive/1ihl7RGNcJjPDxhjKt4sKYKx32QU4e8gI?usp=sharing" target='_blank' className="inline-block text-center px-4 py-2 bg-[#244b3a] text-white rounded-lg hover:bg-blue-700">
              Ouvrir
            </a>
          </div>

          <div className="p-6 border rounded-xl flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-4">Workshop CS - Physics</h3>
            <a href="https://colab.research.google.com/drive/1txhkOnFXyJcxIhon_7YNh1O2IJ4RsPIJ?usp=sharing" target='_blank' className="inline-block text-center px-4 py-2 bg-[#244b3a] text-white rounded-lg hover:bg-blue-700">
              Ouvrir
            </a>
          </div>

          <div className="p-6 border rounded-xl flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-4">Workshop AI - KNN</h3>
            <a href="https://colab.research.google.com/drive/1GC0jw_SOvYw2-8XckwcHGWJR9ZJEyvJV?usp=sharing" target='_blank' className="inline-block text-center px-4 py-2 bg-[#244b3a] text-white rounded-lg hover:bg-blue-700">
              Ouvrir
            </a>
          </div>

          <div className="p-6 border rounded-xl flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-4">Workshop AI - Neural Networks</h3>
            <a href="https://colab.research.google.com/drive/1mNwURC4UGAvfFGE8YjPZoUF_mpDYay4N?usp=sharing" target='_blank' className="inline-block text-center px-4 py-2 bg-[#244b3a] text-white rounded-lg hover:bg-blue-700">
              Ouvrir
            </a>
          </div>
        </div>

      </div>
    </SectionContainer>
  )
}