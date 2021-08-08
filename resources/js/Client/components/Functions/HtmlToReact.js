import React, { useEffect, useState } from 'react'
import { Parser, ProcessNodeDefinitions } from 'html-to-react'
import axios from 'axios';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

const HtmlToReact = ({ data }) => {
    // const [data, setData] = useState(false);

    // useEffect(async () => {
    //     const dataFetch = await axios
    //         .get(`/api/product/produk-baru`)
    //         .then(function (response) {
    //             console.log(response.data);
    //             return response.data.description;
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     setData(dataFetch);
    // }, []);

    var reactComponent = htmlToReactParser.parseWithInstructions(
        data, isValidNode, processingInstructions);

    return (
        <>
            {reactComponent}
        </>
    );
};

// Persistent layout
// Docs: https://inertiajs.com/pages#persistent-layouts
// Dashboard.layout = page => <Layout title="Dashboard" children={page} />;

export default HtmlToReact;

var htmlToReactParser = new Parser();
var isValidNode = function () {
    return true;
};

var processNodeDefinitions = new ProcessNodeDefinitions(React);
var processingInstructions = [
    {
        replaceChildren: true,
        shouldProcessNode: function (node) {
            // console.log(node.attribs['react-element'] != null );
            return node.attribs && node.attribs['react-element'] != null;
            // return node.attribs['react-element'] === 'Accordion';
        },
        processNode: function (node, children, index) {
            switch (node.attribs['react-element']) {
                case 'Accordion':
                    return (
                        <Accordion className="w-full">
                            {children}
                        </Accordion>
                    )
                case 'AccordionItem':
                    return (
                        <AccordionItem>
                            {children}
                        </AccordionItem>
                    )
                case 'AccordionHead':
                    return (
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {children}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                    )
                case 'AccordionPanel':
                    return (
                        <AccordionItemPanel>
                            {children}
                        </AccordionItemPanel>
                    )
                default:
                    break;
            }

        }
    },
    {
        shouldProcessNode: function (node) {
            return true;
        },
        processNode: processNodeDefinitions.processDefaultNode,
    },
];
