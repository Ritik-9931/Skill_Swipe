package skill_swap.skill_exchange.service.serviceImpl;

import skill_swap.skill_exchange.model.SessionRequest;
import skill_swap.skill_exchange.service.SessionRequestService;

import java.util.List;

public class SessionRequestServiceImpl implements SessionRequestService {
    @Override
    public List<SessionRequest> createRequests(Long requesterId, List<Long> receiverIds, Long skillId, String message) {
        return List.of();
    }

    @Override
    public SessionRequest acceptRequest(Long requestId) {
        return null;
    }

    @Override
    public SessionRequest rejectRequest(Long requestId) {
        return null;
    }

    @Override
    public List<SessionRequest> getRequestsByRequester(Long requesterId) {
        return List.of();
    }

    @Override
    public List<SessionRequest> getRequestsByReceiver(Long receiverId) {
        return List.of();
    }
}
