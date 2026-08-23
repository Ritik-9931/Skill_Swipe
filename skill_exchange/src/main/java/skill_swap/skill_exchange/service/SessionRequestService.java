package skill_swap.skill_exchange.service;

import skill_swap.skill_exchange.dto.request.SessionRequestCreateRequest;
import skill_swap.skill_exchange.model.SessionRequest;

import java.util.List;

public interface SessionRequestService {

    List<SessionRequest> createRequests(SessionRequestCreateRequest request);

    SessionRequest acceptRequest(Long requestId);

    SessionRequest rejectRequest(Long requestId);

    List<SessionRequest> getRequestsByRequester(Long requesterId);

    List<SessionRequest> getRequestsByReceiver(Long receiverId);
}