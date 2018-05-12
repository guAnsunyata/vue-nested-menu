
const panelControl = {

    // panel position control
    data() {
        return {
            panel_prevPositionClass: 'prev',
            panel_stagingPositionClass: 'staging',
            panel_nextPositionClass: 'next',
        };
    },

    // panel position s
    methods: {
        panel_slideNext() {
            this.panel_stagingPositionClass = 'prev';
            this.panel_nextPositionClass = 'staging';
        },
        panel_slideBack() {
            this.panel_stagingPositionClass = 'next';
            this.panel_prevPositionClass = 'staging';
        },
        panel_homingPosition() {
            this.panel_prevPositionClass = 'prev';
            this.panel_nextPositionClass = 'next';
            this.panel_stagingPositionClass = 'staging';
        },
    },
};

export default panelControl;
