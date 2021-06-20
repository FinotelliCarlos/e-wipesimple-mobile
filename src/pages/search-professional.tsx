import { useTheme } from "@emotion/react";
import useIndex from "data/hooks/pages/useIndex.page";
import UseSearchProfessional from "data/hooks/pages/useSearchProfessional.page.mobile";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import UserInformation from "ui/components/data-display/UserInformation/UserInformation";
import Button from "ui/components/inputs/Button/Button";
import TextInput from "ui/components/inputs/TextInput/TextInput";
import {
  ErrorText,
  FormContainer,
  ResponseContainer,
  TextContainer,
} from "ui/styles/pages/search-professional.styled";

const SearchProfessional: React.FC = () => {
  const { colors } = useTheme();
  const {
      cep,
      setCep,
      cepValido,
      searchProfessional,
      error,
      professional,
      search,
      load,
      others,
    } = useIndex(),
    { cepAutomatic } = UseSearchProfessional();

  useEffect(() => {
    if (cepAutomatic && !cep) {
      setCep(cepAutomatic);
      searchProfessional(cepAutomatic);
    }
  }, [cepAutomatic]);

  return (
    <ScrollView>
      <PageTitle
        title={"Conheça os profissionais"}
        subtitle={
          "Preencha seu CEP e veja todos os profissionais de sua região"
        }
      />
      <FormContainer>
        <TextInputMask
          value={cep}
          onChangeText={setCep}
          type={"custom"}
          options={{ mask: "99.999-999" }}
          customTextInput={TextInput}
          customTextInputProps={{ label: "Digite seu CEP" }}
        />

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button
          mode={"contained"}
          style={{ marginTop: 32 }}
          color={colors.accent}
          disabled={!cepValido || load}
          onPress={() => searchProfessional(cep)}
          loading={load}
        >
          Buscar
        </Button>

        {search &&
          (professional.length > 0 ? (
            <ResponseContainer>
              {professional.map((item, index) => (
                <UserInformation
                  key={index}
                  name={item.full_name}
                  rating={item.rating || 0}
                  picture={item.picture_user || ""}
                  description={item.city}
                  darker={index % 2 === 1}
                />
              ))}

              {others > 0 && (
                <TextContainer>
                  ...e mais {others}{" "}
                  {others > 1 ? "profissionais atendem" : "profissional atende"}{" "}
                  ao seu endereço.
                </TextContainer>
              )}

              <Button color={colors.accent} mode={"contained"}>
                Contratar um profissional
              </Button>
            </ResponseContainer>
          ) : (
            <TextContainer>
              Ainda não temos nenhum profissional disponivel em sua região.
            </TextContainer>
          ))}
      </FormContainer>
    </ScrollView>
  );
};

export default SearchProfessional;
