
const panelControl = {

    // panel position style
    data() {
        return {
            panel_prevPositionStyle: {},
            panel_stagingPositionStyle: {},
            panel_nextPositionStyle: {},
        };
    },
    mounted() {
        this.panel_prevPositionStyle = this.$_panelControl_positionSet['prev'];
        this.panel_stagingPositionStyle = this.$_panelControl_positionSet['staging'];
        this.panel_nextPositionStyle = this.$_panelControl_positionSet['next'];
    },
    computed: {
        $_panelControl_positionSet() {
            return {
                staging: {
                    left: 0,
                },
                prev: {
                    left: `-${this.panelWidth}px`,
                },
                next: {
                    left: `${this.panelWidth}px`,
                },
            };
        },
    },

    // change panel position change
    methods: {
        panel_slideNext() {
            this.panel_stagingPositionStyle = this.$_panelControl_positionSet['prev'];
            this.panel_nextPositionStyle = this.$_panelControl_positionSet['staging'];
        },
        panel_slideBack() {
            this.panel_stagingPositionStyle = this.$_panelControl_positionSet['next'];;
            this.panel_prevPositionStyle = this.$_panelControl_positionSet['staging'];
        },
        panel_homingPosition() {
            this.panel_prevPositionStyle = this.$_panelControl_positionSet['prev'];
            this.panel_nextPositionStyle = this.$_panelControl_positionSet['next'];
            this.panel_stagingPositionStyle = this.$_panelControl_positionSet['staging'];
        },
    },
};

export default panelControl;
