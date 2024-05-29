package tasker.api.models;

import tasker.api.utils.Utils;


public record UserModel(String username, String password, String email, String firstName, String lastName) implements DataModel {

    @Override
    public boolean isDataCorrupt() {
        return Utils.isStringNull(email) || Utils.isStringNull(username) || Utils.isStringNull(password) ||
                Utils.isStringNull(firstName) || Utils.isStringNull(lastName);
    }
}
