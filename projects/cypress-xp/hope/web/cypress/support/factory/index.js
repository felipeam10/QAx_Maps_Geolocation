import { faker } from '@faker-js/faker';
import _ from 'underscore';

const images = [
    'kids-playground-1.png',
    'kids-playground-2.png',
    'kids-playground-3.png'
];

export default {
    generator: function() {
        return {
            name: faker.company.name(),
            description: faker.lorem.paragraph(),
            opening_hours: faker.word.words(3),
            open_on_weekends: 'true',
            position: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
            },
            image: _.sample(images)
        }
    }
}