"use client";
import React, { useEffect, useState } from 'react';
import { RootLayout } from '@components/Layout';

const DatacenterView = () => {
    // call 'http://127.0.0.1:8000/get-topology/DC?las1'
    return (
        <div>Data Center</div>
    );
};

export default DatacenterView;

DatacenterView.getLayout = function getLayout(page) {
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