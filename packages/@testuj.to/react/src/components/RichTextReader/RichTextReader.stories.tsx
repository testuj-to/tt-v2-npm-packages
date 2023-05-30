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
  <RichTextReader {...args} />
);

export const RichTextReaderStory = richTextReaderStory.bind({});
RichTextReaderStory.args = {
  value: {
    json: '{"blocks":[{"key":"fftk5","text":"Dron AERIUM Nocchi 4K Dual Camera GPS V2","type":"header-two","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"at3lk","text":"Dron AERIUM Nocchi 4K Dual Camera GPS patří mezi jedny z kvalitnějších kvadrokoptér. V případě tohoto dronu se jedná o velmi moderní kvadrokoptéru se čtyřmi rotory. Během velmi zábavného létání můžete s dronem dělat nejen snímky, ale můžete použít i jeho videokameru pro natáčení z výšky.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":57,"length":26,"style":"BOLD"}],"entityRanges":[{"offset":0,"length":37,"key":0}],"data":{}},{"key":"cq06u","text":"Cestování je s tímto dronem také velmi snadné. Díky jeho rozkládací konstrukci je možné jeho tělo pohodlně poskládat a uložit i na menší bezpečné místo. Ve složeném stavu je dron tak miniaturní, že se vejde i do dlaně. Jeho inovativní technologie nabízí mnoho funkcí. Jednou z nejoblíbenější je možnost sledovat snímky v reálném čase, nebo přidávání hudby on-line.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":33,"length":12,"style":"BOLD"},{"offset":98,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"5kk4h","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cboek","text":"Objektiv tohoto dronu je vybaven 4K stínovou čočkou, která snímky tvoří spolu s ostrým obrazem od kraje do kraje bez jakéhokoliv zkreslení. Během létání můžete využít také funkci inteligentního nastavení výšky, která Vám umožní pořizovat stabilnější záběry. Ovládání dronu probíhá pomocí dálkového ovladače, který reaguje na senzory zabudované v dronu. Fotografie a videa nabízí detailnější kvalitu obrazu ve 4 HD kvalitě, které se automaticky uloží do paměti vašeho telefonu.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":33,"length":2,"style":"BOLD"},{"offset":80,"length":14,"style":"BOLD"},{"offset":172,"length":37,"style":"BOLD"},{"offset":238,"length":18,"style":"BOLD"},{"offset":288,"length":18,"style":"BOLD"},{"offset":390,"length":23,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"3q0cc","text":"Inovativní technologie, které u tohoto modelu byly použity, nabízí širokoúhlý duální objektiv. Kapacita jedné baterie vystačí až na 25 minut letu. Mimo to jistě oceníte sledování GPS polohy. Dron AERIUM Nocchi 4K Dual Camera GPS je vhodný naprosto pro každého, kdo si zakládá na jednoduchosti a dobré kvalitě.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":33,"style":"BOLD"},{"offset":126,"length":19,"style":"BOLD"},{"offset":278,"length":31,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"96ecn","text":"","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b2b3t","text":"Více informací o produktu najdete TADY.","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":34,"length":4,"key":1}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://www.vzdusin.cz/dron-aerium-nocchi-4k-dual-camera-gps-3-baterie?search=nocch","rel":"noreferrer noopener","target":"_blank","url":"https://www.vzdusin.cz/dron-aerium-nocchi-4k-dual-camera-gps-3-baterie?search=nocch"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://www.vzdusin.cz/dron-aerium-nocchi-4k-dual-camera-gps-3-baterie?search=nocch","rel":"noreferrer noopener","target":"_blank","url":"https://www.vzdusin.cz/dron-aerium-nocchi-4k-dual-camera-gps-3-baterie?search=nocch"}}}}',
  },
};
