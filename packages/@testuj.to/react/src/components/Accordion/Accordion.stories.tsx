import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Accordion } from ".";

export default {
    component: Accordion,
    title: "Primitives/Accordion",
    parameters: {
        layout: "centered",
    },
    decorators: [TTContextDecorator],
} as ComponentMeta<typeof Accordion>;

const accordionStoryTemplate: ComponentStory<typeof Accordion> = (args) => (
    <div style={{ width: "500px" }}>
        <Accordion {...args} />
    </div>
);

export const Basic = accordionStoryTemplate.bind({});
Basic.args = {
    items: [
        {
            title: "Chci zrušit svoji přihlášku do testování.",
            content: (
                <div>
                    <div>
                        Rozmysleli jste si z jakéhokoli důvodu svoji účast v testování? Není problém, napište nám email
                        na testovani@testuj.to a uveďte, o jaké testování se jedná.
                    </div>
                    <div>
                        Jestliže chcete odstoupit z testování, na které jste již byli vybráni, dejte nám prosím co
                        nejdříve vědět na email testovaní@testuj.to a uveďte také důvod odstoupení. Z testování vás
                        odstraníme a najdeme za vás náhradníka.
                    </div>
                </div>
            ),
            value: "1",
        },
        {
            title: "Chci zrušit svoji přihlášku do testování.",
            content: (
                <div>
                    <div>
                        Rozmysleli jste si z jakéhokoli důvodu svoji účast v testování? Není problém, napište nám email
                        na testovani@testuj.to a uveďte, o jaké testování se jedná. Jestliže email píšete z jiného
                        emailu, než pod kterým jste se do testování hlásili, uveďte prosím i daný email.
                    </div>
                    <div>
                        Jestliže chcete odstoupit z testování, na které jste již byli vybráni, dejte nám prosím co
                        nejdříve vědět na email testovaní@testuj.to a uveďte také důvod odstoupení. Z testování vás
                        odstraníme a najdeme za vás náhradníka.
                    </div>
                </div>
            ),
            value: "2",
        },
        {
            title: "Chci zrušit svoji přihlášku do testování.",
            content: (
                <div>
                    <div>
                        Rozmysleli jste si z jakéhokoli důvodu svoji účast v testování? Není problém, napište nám email
                        na testovani@testuj.to a uveďte, o jaké testování se jedná. Jestliže email píšete z jiného
                        emailu, než pod kterým jste se do testování hlásili, uveďte prosím i daný email.
                    </div>
                    <div>
                        Jestliže chcete odstoupit z testování, na které jste již byli vybráni, dejte nám prosím co
                        nejdříve vědět na email testovaní@testuj.to a uveďte také důvod odstoupení. Z testování vás
                        odstraníme a najdeme za vás náhradníka.
                    </div>
                </div>
            ),
            value: "3",
        },
    ],
    rootProps: {
        collapsible: true,
    },
};
