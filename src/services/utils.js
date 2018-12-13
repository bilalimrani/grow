export default {
    findAndPush(source, target) {
        source.forEach(element => {
            switch (element.type) {
                case 'USER':
                    target.selectedUsers.push(element);
                    break;
                case 'HASH':
                    target.selectedHastags.push(element);
                    break;
                case 'LOCATION':
                    target.selectedLocations.push(element);
                    break;
                default:
                    break;
            }
        });
    }
}