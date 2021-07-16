







function setTheme() {

    // Theme Data
    lightTheme = {

        clr_app_bg: "hsl(0,0%,92%)",
        clr_window_frame : "hsl(0,0%,80%)",
    
        clr_input_form_bg: "hsl(0,0%,88%)",
        clr_input_form_bg_border: "hsl(0,0%,80%)",
        clr_drawing_container: "white",
        clr_subsection: "none",
        clr_subsection_border: "hsl(0,0%,10%)",
        clr_text: "hsl(0,0%,5%)",
        clr_tab_button: "none",
        clr_tab_button_text: "hsl(0,0%,5%)",
        
        clr_on_off_bg: "hsl(0,00%,70%)",
        clr_on_off_thumb: "hsla(30,50%,50%,0.8)",
        clr_slider_thumb: "hsla(100,50%,50%,0.8)",
        
        drop_shadow_outset:"0.1px 0.3px 1px gray",
        drop_shadow_subsection: "var(__drop_shadow_outset)",
        drop_shadow_input_form: "var(__drop_shadow_outset)",
      
        clr_btn_border: "hsl(0,0%,80%)",
        button_font_weight: "500",
        button_font_weight_active:"600",
        clr_tab_button_hover: "hsl(0,0%,70%)",
        clr_tab_button_active: "hsl(0,0%,60%)",
      
        
        clr_input_bg: "hsl(250,30%,100%)",
        clr_input_bg_focus: "rgba(255, 236, 127, 0.721)",
      
        sat_header: '80%',
        lit_header: '10%',
        clr_h1: 'hsl(000,var(sat_header),var(lit_header))',
        clr_h2: 'hsl(250,var(sat_header),var(lit_header))',
        clr_h3: 'hsl(100,var(sat_header),var(lit_header))',
        clr_h4: 'hsl(200,var(sat_header),var(lit_header))',
        clr_h5: 'hsl(000,var(sat_header),var(lit_header))',
      
        clr_control_name_text:"hsl(60,50%,10%)",
    }

    darkTheme = {

        clr_app_bg: 'hsla(0,0%,10%)',
        clr_window_frame:'hsl(0,0%,20%)',

        clr_input_form_bg: 'hsl(0,0%,15%)',
        clr_input_form_bg_border: 'hsl(0,0%,0%)',

        clr_drawing_container: "hsl(0,0%,15%)",
        clr_subsection: 'none',
        clr_subsection_border: 'hsl(0,0%,80%)',
        clr_tab_button: 'var(clr_input_form_bg)',
        clr_tab_button: 'none',
        clr_tab_button_text: 'hsl(200,40%,50%)',
        clr_tab_button_font_weight: 'bold',
        clr_text: 'hsl(0,0%,80%)',

        clr_button:'hsl(200,30%,70%)',
        button_font_weight: '600',
        button_font_weight_active:'550',
        clr_button_text:'hsl(0,0%,0%)',
        drop_shadow_inset:'inset 0 0 2px black',
        drop_shadow_outset: '0.1px 0.3px 3px hsl(0,0%,5%)',

        drop_shadow_subsection: 'var(drop_shadow_inset)',
        drop_shadow_input_form: 'var(drop_shadow_outset)',

        clr_btn_border: 'hsl(200,40%,50%)',
        clr_tab_button_hover: 'hsl(200,40%,50%)',
        clr_tab_button_active: 'hsl(200,40%,50%)',

        clr_input_bg: 'hsl(250,20%,80%)',
        clr_input_bg_focus: 'rgba(255, 236, 127, 0.721)',
        input_font_weight: '600',

        clr_on_off_bg: 'hsl(250,20%,80%)',
        clr_on_off_thumb: 'hsl(230,30%,50%)',
        clr_slider_thumb: 'hsl(100,10%,80%)',

        clr_h1: 'hsl(000,30%,80%)',
        clr_h2: 'hsl(000,30%,80%)',
        clr_h3: 'hsl(100,20%,90%)',
        clr_h4: 'hsl(200,30%,80%)',
        clr_h5: 'hsl(040,30%,80%)',

        sat_header: '45%',
        lit_header: '80%',
        clr_h1: 'hsl(000,var(sat_header),var(lit_header))',
        clr_h2: 'hsl(250,var(sat_header),var(lit_header))',
        clr_h3: 'hsl(100,var(sat_header),var(lit_header))',
        clr_h4: 'hsl(200,var(sat_header),var(lit_header))',
        clr_h5: 'hsl(000,var(sat_header),var(lit_header))',

        clr_control_name_text:'hsl(60,50%,80%)',
    }


    

    let root = document.documentElement;

    var themeValue = doc1.setTheme.value;

    var theme = darkTheme;

    if(themeValue==0) {
        theme = darkTheme;
        // paramsEditor.setOption("theme","midnight")
        // editor.setOption("theme","midnight")
    } else {
        theme = lightTheme;
        // paramsEditor.setOption("theme","default")
        // editor.setOption("theme","default")
    }

    // //console.log(lightTheme);

    keys = Object.keys(theme);

    for(i=0; i<keys.length; i++) {

        var key = keys[i];

        var property = "--" + key;

        var value = theme[key];

        // //console.log(typeof property);
        // //console.log("property:",property,"value",value);

        root.style.setProperty(property, value);
    }
}