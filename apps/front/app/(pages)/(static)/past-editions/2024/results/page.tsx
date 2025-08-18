import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mdm/ui"
import results from "./results";
import TextureBg from "@/app/components/texture-bg";

export default function PastEditionPage() {
  const goldGradient = 'bg-gradient-to-r from-transparent to-[#FFCF40]';
  const silverGradient = 'bg-gradient-to-r from-transparent to-[#D3D3D3]';
  const bronzeGradient = 'bg-gradient-to-r from-transparent to-[#cd7f32]';
  const honorableGradient = 'bg-gradient-to-r from-transparent to-sky-300';

  const getGradient = (ranking: string) => {
    const parseRank = parseInt(ranking);

    if (parseRank <= 10) return goldGradient;
    else if (parseRank >=11 && parseRank <= 21) return silverGradient;
    else if (parseRank >= 24 && parseRank <= 37) return bronzeGradient;
    else if (parseRank >= 38 && parseRank <= 51) return honorableGradient;
    else return '';
  }

  const getPrize = (ranking: string) => {
    const parseRank = parseInt(ranking);

    if (parseRank == 1) return "First Prize";
    else if (parseRank == 2) return "Second Prize";
    else if (parseRank == 3) return "Third Prize";
    else if (parseRank <= 10) return "Gold Medal";
    else if (parseRank >=11 && parseRank <= 21) return "Silver Medal";
    else if (parseRank >= 24 && parseRank <= 37) return "Bronze Medal";
    else if (parseRank >= 38 && parseRank <= 51) return "Honorable Mention";
    else return '';
  }

  return (
    <TextureBg className="bg-[#fff9f3]">
      <div className="w-full md:max-w-7xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[4rem]"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Results <span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>2024</span>
        </h1>

        <div
            className="flex justify-around flex-wrap gap-6 md:p-8 animate-fade-up opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ranking</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>School/University</TableHead>
                <TableHead>Education Level</TableHead>
                <TableHead>P1</TableHead>
                <TableHead>P2</TableHead>
                <TableHead>P3</TableHead>
                <TableHead>P4</TableHead>
                <TableHead>P5</TableHead>
                <TableHead>P6</TableHead>
                <TableHead>P7</TableHead>
                <TableHead>P8</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Prize</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result: any) => (
                <TableRow key={result["Ranking"]} className={getGradient(result['Ranking'])}>
                  <TableCell className="font-medium">{result["Ranking"]}</TableCell>
                  <TableCell>{`${result["Last Name"]} ${result["First Name"]}`}</TableCell>
                  <TableCell>{result['Affiliation']}</TableCell>
                  <TableCell>{result['Education level']}</TableCell>
                  <TableCell>{result['P1']}</TableCell>
                  <TableCell>{result['P2']}</TableCell>
                  <TableCell>{result['P3']}</TableCell>
                  <TableCell>{result['P4']}</TableCell>
                  <TableCell>{result['P5']}</TableCell>
                  <TableCell>{result['P6']}</TableCell>
                  <TableCell>{result['P7']}</TableCell>
                  <TableCell>{result['P8']}</TableCell>
                  <TableCell>{result['Total']}</TableCell>
                  <TableCell className="text-right">{getPrize(result['Ranking'])}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>      
      </div>
    </TextureBg>
  )
}

