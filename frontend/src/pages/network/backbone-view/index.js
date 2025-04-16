"use client";
import React, { useEffect, useState } from 'react';
import { RootLayout } from '@components/Layout';

const BackboneView = () => {
    // call 'http://127.0.0.1:8000/get-topology/filter?Backbone'
    return (
        <>Backbone</>
    );
};

export default BackboneView;

BackboneView.getLayout = function getLayout(page) {
    const sidebarContent = [
        {
            link: '/network/backbone-view',
            label: 'Backbone View'
        },
        {
            link: '/network/datacenter-view',
            label: 'Data Center View'
        },
        {
            link: '/network/regex-filter-view',
            label: 'Regex Filter View'
        }
    ];

    return (
        <RootLayout sidebarContent={sidebarContent}>{page}</RootLayout>
    )
}