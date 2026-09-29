import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Demo from "@/components/sections/Demo";
import * as S from "@/components/sections/Sections";
export default function Page() {
  return (<main><Nav /><Hero /><S.Problem /><S.Solution /><S.Workflow /><S.Architecture /><S.Hardware /><S.EdgeAI /><S.Irrigation /><Demo /><S.Prototype /><S.Impact /><S.Roadmap /><S.Footer /></main>);
}
