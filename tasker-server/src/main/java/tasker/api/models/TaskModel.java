package tasker.api.models;


import tasker.api.utils.Utils;

public record TaskModel(Long id, String description, Integer priority) implements DataModel {
    @Override
    public boolean isDataCorrupt() {
        return id == null || Utils.isStringNull(description) || priority == null;
    }
}
