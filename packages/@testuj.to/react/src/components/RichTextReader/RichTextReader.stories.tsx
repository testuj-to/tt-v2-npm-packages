import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { RichTextReader } from ".";

export default {
    component: RichTextReader,
    title: "Primitives/RichTextReader",
    parameters: {
        layout: "centered",
    },
    decorators: [TTContextDecorator],
} as ComponentMeta<typeof RichTextReader>;

const richTextReaderStory: ComponentStory<typeof RichTextReader> = (args) => (
    <div style={{ width: "800px" }}>
        <RichTextReader {...args} />
    </div>
);

export const RichTextReaderStory = richTextReaderStory.bind({});
RichTextReaderStory.args = {
    value: {
        json: '{"blocks":[{"key":"ueq5","text":"Rich Text Format","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"6c65u","text":"Rich Text Format (RTF) je proprietární formát souboru, který vyvinula společnost Microsoft a který umožňuje ukládat text spolu s jeho formátováním. Na rozdíl od prostého textu, který obsahuje pouze samotný text bez jakéhokoli formátování, RTF umožňuje ukládat informace o tom, zda je text tučný, kurzíva, podtržený, má určitou velikost písma nebo barvu.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"BOLD"},{"offset":26,"length":12,"style":"BOLD"},{"offset":134,"length":12,"style":"BOLD"},{"offset":289,"length":5,"style":"BOLD"},{"offset":296,"length":7,"style":"BOLD"},{"offset":305,"length":9,"style":"BOLD"},{"offset":327,"length":14,"style":"BOLD"},{"offset":347,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"85ebl","text":"Zde je několik klíčových bodů o RTF:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8u9ip","text":"Vyměna dokumentů","type":"header-two","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1jg8t","text":"RTF byl navržen tak, aby bylo možné snadno vyměňovat dokumenty s jednoduchým formátováním mezi různými textovými procesory a platformami. To znamená, že dokument vytvořený v aplikaci Microsoft Word lze obvykle otevřít a zobrazit v jiném textovém procesoru, který podporuje RTF, za předpokladu, že aplikace podporuje stejné vlastnosti formátování.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":36,"length":6,"style":"BOLD"},{"offset":278,"length":67,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"cctt","text":"Proprietární","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"7hmio","text":"I když je RTF široce podporován, je to proprietární formát, což znamená, že je vlastněn a řízen společností Microsoft. To může znamenat, že některé aplikace nemusí podporovat všechny funkce RTF a vzhled dokumentu se může mírně lišit v závislosti na aplikaci, ve které je otevřen.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":39,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"3n6jd","text":"Příklady použití","type":"header-four","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"70bb5","text":"RTF se často používá pro základní formátování v e-mailech, dokumentech online spolupráce a textových souborech určených pro sdílení s lidmi, kteří nemusí mít stejný software pro zpracování textu.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":25,"length":20,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"daacb","text":"Doufám, že toto vysvětlení vám pomůže pochopit, co je Rich Text Format. Pokud máte další dotazy, neváhejte se zeptat.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"o8ff","text":"Nadpis 5","type":"header-five","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7veap","text":"RTF se často používá pro základní formátování v e-mailech, dokumentech online spolupráce a textových souborech určených pro sdílení s lidmi, kteří nemusí mít stejný software pro zpracování textu.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":25,"length":20,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"4fp1c","text":"Doufám, že toto vysvětlení vám pomůže pochopit, co je Rich Text Format. Pokud máte další dotazy, neváhejte se zeptat.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5pjui","text":"Nadpis 6","type":"header-six","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7cike","text":"RTF byl navržen tak, aby bylo možné snadno vyměňovat dokumenty s jednoduchým formátováním mezi různými textovými procesory a platformami. To znamená, že dokument vytvořený v aplikaci Microsoft Word lze obvykle otevřít a zobrazit v jiném textovém procesoru, který podporuje RTF, za předpokladu, že aplikace podporuje stejné vlastnosti formátování.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":36,"length":6,"style":"BOLD"},{"offset":278,"length":67,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
};
