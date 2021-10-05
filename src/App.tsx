import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import './slider.css';
import PageRouter from './pages/__PageRouter';
import { r, s } from './pages/incoming';

function App() {
    // initiating - SETTINGS - reducer
    const [state_settings, dispatch_settings] = useReducer(r.settings.reducer, r.settings.initialState);
    // initiating - SETTINGS - reducer
    const [state_user, dispatch_user] = useReducer(r.user.reducer, r.user.initialState);
    // initiating - ADMIN - reducer
    // const [state_med, dispatch_med] = useReducer(r.med.reducer, r.med.initialState);
    // initiating - ADMIN - reducer

    return (
        <>
            {/* SETTINGS */}
            <r.settings.StateContext.Provider value={state_settings}>
                <r.settings.DispatchContext.Provider value={dispatch_settings}>
                    {/* USER */}
                    <r.user.StateContext.Provider value={state_user}>
                        <r.user.DispatchContext.Provider value={dispatch_user}>
                            {/* MEDS */}
                            {/* <r.med.StateContext.Provider value={state_med}>
                                <r.med.DispatchContext.Provider value={dispatch_med}> */}
                            {/* FINAL PAGE */}
                            <PageRouter />
                            {/* </r.med.DispatchContext.Provider>
                            </r.med.StateContext.Provider> */}
                            {/* UPLOADS - end */}
                        </r.user.DispatchContext.Provider>
                    </r.user.StateContext.Provider>
                    {/* USER - end */}
                </r.settings.DispatchContext.Provider>
            </r.settings.StateContext.Provider>
            {/* SETTINGS - end */}
        </>
    );
}

export default App;
