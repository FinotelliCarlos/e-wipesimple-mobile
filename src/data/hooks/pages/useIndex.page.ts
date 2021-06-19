import { useMemo, useState } from "react";
import { UserShortIrterface } from "data/@types/UserInterface";
import { ValidationService } from "data/services/ValidationService";
import { ApiService } from "data/services/ApiService";

export default function useIndex() {
  // CEP
  const [cep, setCep] = useState("");
  // CEP Valido
  const cepValido = useMemo(() => {
    return ValidationService.cep(cep);
  }, [cep]);
  // Mensagem de Erro
  const [error, setError] = useState("");
  // Busca por endereço(CEP)
  const [search, setSearch] = useState(false);
  // Carregando
  const [load, setLoad] = useState(false);
  // diaristas
  const [professional, setProfessional] = useState([] as UserShortIrterface[]);
  // diaristas restantes
  const [others, setProfessionalsOthers] = useState(0);

  async function searchProfessional(cep: string) {
    setSearch(false);
    setLoad(true);
    setError("");

    try {
      const { data } = await ApiService.get<{
        professional: UserShortIrterface[];
        others: number;
      }>("/api/profissionais-cidade?cep=" + cep.replace(/\D/g, ""));

      setProfessional(data.professional);
      setProfessionalsOthers(data.others);

      setSearch(true);
      setLoad(false);
    } catch (error) {
      setError("CEP não encontrado");
      setLoad(false);
    }
  }

  return {
    cep,
    setCep,
    cepValido,
    searchProfessional,
    error,
    professional,
    search,
    load,
    others,
  };
}
