import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: "Welcome To GadgetCraze",
    description: "We sell the best premium products!",
    keywords: "electronics, buy electronics, cheap electroincs, premium electronics, gadgets",
};

export default Meta;
