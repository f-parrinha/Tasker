package tasker.api.utils;

/**
 * Class  Shell  handles the printing and logging of the system
 * @author Francisco Parrinha
 */
public class Shell {

    /** Constants */
    public static final String DASH = "> ";
    public static final String EMPTY = " ";
    public static final String RESULT_ENTRY = "RESULT: ";
    public static final String DEBUG_ENTRY = "DEBUG: ";
    public static final String FINE_ENTRY = "FINE: ";
    public static final String ERROR_ENTRY = "ERROR: ";

    /** Variables */
    private static Shell instance;
    private boolean debugOn;

    private Shell(boolean debugState) {
        this.debugOn = debugState;
    }

    /**
     * Returns the Singleton instance
     * @return self instance
     */
    public static Shell getInstance() {
        return instance == null ? (instance = new Shell(true)) : instance;
    }

    /**
     * Returns the Singleton instance and changes its debug state
     * @param debugState debug state to set
     * @return self instance
     */
    public static Shell getInstance(boolean debugState) {
        if(instance == null) {
            return instance = new Shell(debugState);
        }

        // Return existing instance
        instance.setDebugState(debugState);
        return instance;
    }

    /**
     * Prints a new custom line starting with a "> " on the shell interface
     * @param text the output text
     */
    public void printLine(String text){
        System.out.println(DASH + text);
    }

    /**
     * Prints the input DASH
     */
    public void printInput() {
        System.out.print(DASH);
    }

    /**
     * Prints a new line and adds the input DASH
     * @param text the output text
     */
    public void printLineInput(String text){
        System.out.println(DASH + text);
        System.out.print(DASH);
    }

    /**
     * Prints text with a 'debug' label
     * @param text debug to print
     */
    public void printDebug(String text) {
        if (debugOn) printLine(DEBUG_ENTRY + text);
    }

    /**
     * Prints text with a 'result' label
     * @param text result to print
     */
    public void printResult(String text) {
        printLine(RESULT_ENTRY + text);
    }

    /**
     * Prints text with a 'fine' label
     * @param text text to print
     */
    public void printFine(String text) {
        printLine(FINE_ENTRY + text);
    }

    /**
     * Prints text with a 'error' label
     * @param text error to print
     */
    public void printError(String text) {
        printLine(ERROR_ENTRY + text);
    }

    /**
     * Checks whether DEBUG is on or not
     * @return debug state
     */
    public boolean isDebugOn(){
        return debugOn;
    }

    /**
     * Changes the debug state into a new value
     * @param value true or false (activated or not)
     */
    public void setDebugState(boolean value) {
        debugOn = value;
    }
}
