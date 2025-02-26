class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange100.png',
    ]

    percentage = 100;

    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.IMAGES)
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}